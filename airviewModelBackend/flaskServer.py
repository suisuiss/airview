from flask import Flask
import pandas as pd
import requests
from apscheduler.schedulers.background import BackgroundScheduler
from darts import TimeSeries
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from sklearn.preprocessing import StandardScaler
from darts.models import NBEATSModel
from pymongo.mongo_client import MongoClient
from datetime import datetime

def uploadHourlyData():
    client = MongoClient('mongodb+srv://meowo:xRDFRKwNexWznNQg@airview.wz6lfvt.mongodb.net/?retryWrites=true&w=majority')
    db = client['AQIData']
    collection = db['historicAqiHourly']
    data = fetchAQIData()

    # Check if a record with the same time already exists
    existing_data = collection.find_one({'time': data['time']})

    if existing_data is None:
        result = collection.insert_one(data)
        if result.acknowledged:
            print(f"Hourly data inserted with ID: {result.inserted_id}")
        else:
            print("Failed to insert data.")
    else:
        print("Data with the same time already exists, no insertion needed.")

def uploadDailyData():
    client = MongoClient('mongodb+srv://meowo:xRDFRKwNexWznNQg@airview.wz6lfvt.mongodb.net/?retryWrites=true&w=majority')
    db = client['AQIData']
    collection = db['historicAqi']
    data = fetchTotalDayData()

    # Check if a record with the same time already exists
    existing_data = collection.find_one({'date': data['date']})

    if existing_data is None:
        result = collection.insert_one(data)
        if result.acknowledged:
            print(f"Daily data inserted with ID: {result.inserted_id}")
        else:
            print("Failed to insert data.")
    else:
        print("Data with the same time already exists, no insertion needed.")

def fetchAQIData():
    # Define the API URL
    api_url = "https://api.waqi.info/feed/@5773/?token=93251e1c93612cabd3b0bd3214148bb64039c4ec"
    try:
        # Send a GET request to the API URL
        response = requests.get(api_url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON response
            data = response.json()

            # Extract the AQI data or any other information you need
            aqi = data['data']['aqi']
            time = data['data']['time']['s']

            # Create a data dictionary
            data_to_insert = {
                'time': time,
                'AQI': aqi
            }
            return data_to_insert
        else:
            print(f"Failed to fetch data. Status code: {response.status_code}")

    except Exception as e:
        print(f"An error occurred: {e}")

def fetchTotalDayData():
    print('starting fetching')
    client = MongoClient('mongodb+srv://meowo:xRDFRKwNexWznNQg@airview.wz6lfvt.mongodb.net/?retryWrites=true&w=majority')
    db = client['AQIData']
    collection = db['historicAqiHourly']

    # Get the local date
    local_date = datetime.now().date()

    # Construct the query to find records with a date matching the local_date
    query = {
        "time": {
            "$regex": f".*{local_date}.*"
        }
    }

    # Find the records that match the query
    matching_data = collection.find(query)  # Convert matching_data to a list
    if matching_data:
        aqi_sum = 0
        aqi_count = 0
        time = None
        # Data was found, process and print it
        for data in matching_data:
            aqi_sum += data['AQI']
            aqi_count += 1

            # Extract the date (time) from the first record
            if time is None:
                time = datetime.strptime(data['time'], '%Y-%m-%d %H:%M:%S')

        # Calculate the average AQI value
        average_aqi = aqi_sum / aqi_count

        # Format the time in 'yyyy-mm-dd' format
        formatted_time = time.strftime('%Y-%m-%d')

        # Create the result dictionary
        result = {'date': formatted_time, 'AQI': average_aqi}
        return result
    else:
        # No data was found
        print("No data found for the local date.")

def get_data():
    print('Starting dataframe initialization')
    client = MongoClient('mongodb+srv://meowo:xRDFRKwNexWznNQg@airview.wz6lfvt.mongodb.net/?retryWrites=true&w=majority')
    db = client['AQIData']
    collection = db['historicAqi']
    data = list(collection.find())  # Fetch all data from the collection

    df = pd.DataFrame(data) # Data Augmentation
    df = df.drop('_id', axis=1)
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values(by='date', ascending=True)
    df = df.reset_index(drop=True)
    return df;

def fetchTempData():
    api_url = "https://www.meteosource.com/api/v1/free/point?place_id=postal-th-10140&sections=current%2Chourly&language=en&units=auto&key=t66kz0c4o4d1oi27t84scaz7kiiof5id124hfdx9"
    
    try:
        # Send a GET request to the API URL
        response = requests.get(api_url)
        
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON response
            data = response.json()
            
            # Extract hourly temperature data
            hourly_data = data.get("hourly", {}).get("data", [])
            
            if hourly_data:
                # Extract date and temperature values
                hourly_temp_data = [
                    {
                        "date": entry.get("date", ""),
                        "temperature": entry.get("temperature", 0)
                    }
                    for entry in hourly_data
                ]
                df = pd.DataFrame(hourly_temp_data)
                df['date'] = pd.to_datetime(df['date'])
                return df
            else:
                print("Hourly data not found in the response.")
        else:
            print(f"Failed to fetch data. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
    return "null"

def adjust_aqi_based_on_temperature(aqi, temperature_celsius):
    # Define the relationship between temperature and AQI
    # You can adjust the coefficients based on your specific needs
    aqi_adjusted = aqi - (temperature_celsius - 25) * 2

    # Ensure that the adjusted AQI remains within a certain range (e.g., 0 to 500)
    aqi_adjusted = max(0, min(aqi_adjusted, 500))

    return aqi_adjusted

def makePrediction():
    client = MongoClient('mongodb+srv://meowo:xRDFRKwNexWznNQg@airview.wz6lfvt.mongodb.net/?retryWrites=true&w=majority')
    db = client['AQIData']
    collection = db['forecastedAqi']
    # Call the function to get the data
    result = get_data()
    mean_AQI = result['AQI'].mean()
    train, test = result.iloc[:int(len(result) * 0.8)], result.iloc[int(len(result) * 0.8):]
    unidf = TimeSeries.from_dataframe(train, "date", "AQI",fill_missing_dates=True, fillna_value=mean_AQI)
    test = TimeSeries.from_dataframe(test, 'date', 'AQI',fill_missing_dates=True, fillna_value=mean_AQI)
    model = NBEATSModel(input_chunk_length=100, output_chunk_length=7, n_epochs = 150)
    model_fit = model.fit(unidf)
    preds = model_fit.predict(10)
    preds_df = preds.pd_dataframe()
    preds_df.reset_index(inplace=True)

    temp_df = fetchTempData()
    temp_df['hourly_date'] = temp_df['date']
    temp_df['date'] = pd.to_datetime(temp_df['date']).dt.strftime('%Y-%m-%d')
    temp_df['date'] = pd.to_datetime(temp_df['date'])
    preds_df['date'] = pd.to_datetime(preds_df['date'])
    temp_df = temp_df.merge(preds_df[['date', 'AQI']], on='date', how='left')
    temp_df.rename(columns={'AQI': 'average_aqi'}, inplace=True)
    temp_df['hourly_AQI'] = temp_df.apply(lambda row: adjust_aqi_based_on_temperature(row['average_aqi'], row['temperature']), axis=1)
    temp_df['hourly_AQI'] = np.ceil(temp_df['hourly_AQI'])
    temp_df = temp_df.drop(['date','temperature','average_aqi'], axis=1)
    records = temp_df.to_dict(orient="records")
    for record in records:
        # Use the 'date' field as the filter
        filter = {"date": record["date"]}
        
        # Try to update an existing document or insert a new one if not found
        collection.update_one(filter, {"$set": record}, upsert=True)

    # Close the MongoDB client when done
    client.close()
    return ("Function Done")

sched = BackgroundScheduler(daemon=True)
sched.add_job(uploadHourlyData,'interval',minutes=60)
sched.add_job(uploadDailyData,'cron', hour=23, minute=30)
sched.add_job(makePrediction,'interval',minutes=720)
sched.start()

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/sucky")
def hello_mom():
    return "<p>Hello, Mother!</p>"

@app.route("/get-forecasted-aqi")
def getForecastAqi():
    client = MongoClient('mongodb+srv://meowo:xRDFRKwNexWznNQg@airview.wz6lfvt.mongodb.net/?retryWrites=true&w=majority')
    db = client['AQIData']
    collection = db['forecastedAqi']
    data = list(collection.find())  # Fetch all data from the collection

    return(data)