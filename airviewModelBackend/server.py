import requests
import pandas as pd
import numpy as np
from pymongo.mongo_client import MongoClient
import seaborn as sns
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose
from darts import TimeSeries
from darts.models import ARIMA, AutoARIMA, ExponentialSmoothing, Prophet, FFT
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler
# Deep learning models
from darts.models import TiDEModel
# Regression models
from darts.models import XGBModel, CatBoostModel, RandomForest

def fetch_aqi_data():
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
            city = data['data']['city']['name']

            print(f"City: {city}")
            print(f"AQI: {aqi}")

        else:
            print(f"Failed to fetch data. Status code: {response.status_code}")

    except Exception as e:
        print(f"An error occurred: {e}")

def csvAugmentation():
    # Replace with the path to your CSV file
    csv_file = './input/bangkok-air-quality.csv'
    
    # Read the CSV file into a DataFrame
    df = pd.read_csv(csv_file)
    
    # Convert the 'date' column to datetime
    df['date'] = pd.to_datetime(df['date'])
    
    # Define the date threshold
    threshold_date = pd.to_datetime('2022-01-01')
    
    # Filter the DataFrame to keep only rows newer than the threshold date
    df = df[df['date'] >= threshold_date]
    
    # Sort the DataFrame by 'date' in descending order
    df = df.sort_values(by='date', ascending=False)
    
    # Reset the index
    df = df.reset_index(drop=True)
    
    # Replace leading and trailing whitespace with '0' for all columns
    df = df.astype(str)
    for column in df.columns:
        df[column] = df[column].apply(lambda x: '0' + x if x.strip() == '' else x)  # Add '0' only if whitespace
    df.columns = df.columns.str.strip()

     # Convert value columns to numeric
    value_columns = ['pm25', 'pm10', 'o3', 'no2', 'so2', 'co']
    for col in value_columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')  # 'coerce' will convert non-numeric values to NaN

    # Create a new DataFrame with 'date' and the highest value as AQI
    df['AQI'] = df[value_columns].max(axis=1)
    new_df = df[['date', 'AQI']]
    
    # Print the new DataFrame
    return new_df

def uploadToMongoDB(dataframe):
    try:
        # Establish a connection to your MongoDB server (replace with your connection string)
        client = MongoClient('mongodb+srv://meowo:xRDFRKwNexWznNQg@airview.wz6lfvt.mongodb.net/?retryWrites=true&w=majority')

        # Choose a database where you want to store the data (replace with your database name)
        db = client['AQIData']

        # Choose a collection (similar to a table) where you want to insert the data
        collection = db['historicAqiHourly']

        # Convert the DataFrame to a list of dictionaries
        data = dataframe.to_dict(orient='records')

        # Insert the data into the MongoDB collection
        collection.insert_many(data)

        print("Success")
    except Exception as e:
        print(f"Error: {e}")

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

def plot_chart(df):
    # Create a line chart using Seaborn
    plt.figure(figsize=(10, 6))  # Set the figure size

    sns.lineplot(data=df, x='date', y='AQI')

    # Customize the plot (optional)
    plt.title('AQI Over Time')
    plt.xlabel('Date')
    plt.ylabel('AQI Value')

    # Show the plot
    plt.xticks(rotation=45)  # Rotate x-axis labels for readability
    plt.tight_layout()
    plt.show()

def datascaling(df):
    scaler = MinMaxScaler()
    std_scaler = StandardScaler(with_mean = False)
    date_column = df['date']
    df.drop('date', inplace=True, axis=1)

    scaled_data = std_scaler.fit_transform(df)
    scaled_data = scaler.fit_transform(scaled_data)
    scaled_data = pd.DataFrame(scaled_data, columns=df.columns)

    scaled_data.insert(0, 'date', date_column)
    return scaled_data

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


def makePrediction(days):
    """
    # Call the function to get the data
    result = get_data()
    mean_AQI = result['AQI'].mean()
    train, test = result.iloc[:int(len(result) * 0.8)], result.iloc[int(len(result) * 0.8):]
    unidf = TimeSeries.from_dataframe(train, "date", "AQI",fill_missing_dates=True, fillna_value=mean_AQI)
    test = TimeSeries.from_dataframe(test, 'date', 'AQI',fill_missing_dates=True, fillna_value=mean_AQI)
    model = TiDEModel(input_chunk_length=100, output_chunk_length=7, n_epochs = 150)
    model_fit = model.fit(unidf)
    preds = model_fit.predict(days)
    preds_df = preds.pd_dataframe()
    preds_df.reset_index(inplace=True)
    """
    data1 = {'date': ['2023-10-16', '2023-10-17', '2023-10-18', '2023-10-19'],
         'AQI': [80.331149, 79.273790, 72.715031, 87.025199]}
    preds_df = pd.DataFrame(data1)

    temp_df = fetchTempData()
    temp_df['hourly_date'] = temp_df['date']
    temp_df['date'] = pd.to_datetime(temp_df['date']).dt.strftime('%Y-%m-%d')
    temp_df['date'] = pd.to_datetime(temp_df['date'])
    preds_df['date'] = pd.to_datetime(preds_df['date'])
    temp_df = temp_df.merge(preds_df[['date', 'AQI']], on='date', how='left')
    temp_df.rename(columns={'AQI': 'average_aqi'}, inplace=True)
    temp_df['hourly_AQI'] = temp_df.apply(lambda row: adjust_aqi_based_on_temperature(row['average_aqi'], row['temperature']), axis=1)
    temp_df = temp_df.drop(['date','temperature','average_aqi'], axis=1)
    print(temp_df)


if __name__ == "__main__":
    makePrediction(10)
# Use TIDE


    """
        uni_models = {
            "Arima": ARIMA(),
            "AutoARIMA": AutoARIMA(),
            "ESN": ExponentialSmoothing(),
            "Prophet": Prophet(),
            "FFT": FFT()
        }
        for n, m in uni_models.items():
            model = m.fit(unidf)
            preds = m.predict(len(test))
            loss = mse(test, preds)
            results[n] = [preds, loss]
            preds.plot(label=n + f" {loss:.2f}")

        regression_models = {
            'XGB': XGBModel(lags=350),
            'CatBoost': CatBoostModel(lags=350),
            'Forest': RandomForest(lags=350),
        }
        for n, m in regression_models.items():
            model = m.fit(unidf)
            preds = m.predict(len(test))
            loss = mse(test, preds)
            results[n] = [preds, loss]
            preds.plot(label=n + f" {loss:.2f}")
    """