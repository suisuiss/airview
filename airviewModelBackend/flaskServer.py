from flask import Flask
import requests
from apscheduler.schedulers.background import BackgroundScheduler
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

sched = BackgroundScheduler(daemon=True)
sched.add_job(uploadHourlyData,'interval',minutes=60)
sched.add_job(uploadDailyData,'cron', hour=23, minute=30)
sched.start()

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/sucky")
def hello_mom():
    return "<p>Hello, Mother!</p>"