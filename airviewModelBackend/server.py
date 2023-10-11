import requests
import pandas as pd
import numpy as np
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

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
        collection = db['historicAqi']

        # Convert the DataFrame to a list of dictionaries
        data = dataframe.to_dict(orient='records')

        # Insert the data into the MongoDB collection
        collection.insert_many(data)

        print("Success")
    except Exception as e:
        print(f"Error: {e}")


def testNetwork():
    uri = "mongodb+srv://meowo:xRDFRKwNexWznNQg@airview.wz6lfvt.mongodb.net/?retryWrites=true&w=majority"
    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    


if __name__ == "__main__":
    new_df = csvAugmentation()