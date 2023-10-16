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
from darts.metrics import mse
from sklearn.preprocessing import StandardScaler
# Deep learning models
from darts.models import NHiTSModel, NBEATSModel, TFTModel, RNNModel, TiDEModel
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
    scaled_df = pd.DataFrame(scaled_data, columns=df.columns)

    scaled_df.insert(0, 'date', date_column)
    return scaled_df

if __name__ == "__main__":
    # Call the function to get the data
    result = get_data()
    result = datascaling(result)
    mean_AQI = result['AQI'].mean()
    train, test = result.iloc[:int(len(result) * 0.8)], result.iloc[int(len(result) * 0.8):]
    print (train)
    print("---------------------")
    print (test)
    unidf = TimeSeries.from_dataframe(train, "date", "AQI",fill_missing_dates=True, fillna_value=mean_AQI)
    test = TimeSeries.from_dataframe(test, 'date', 'AQI',fill_missing_dates=True, fillna_value=mean_AQI)
    results = {}
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

    dl_models = {
        "TiDE": TiDEModel(input_chunk_length=100, output_chunk_length=7, n_epochs = 150),
        "RNNModel": RNNModel(model="LSTM", input_chunk_length=100, output_chunk_length=7,n_epochs = 150),
        "NHiTS": NHiTSModel(input_chunk_length=100, output_chunk_length=7, n_epochs = 150),
        "NBEATS": NBEATSModel(input_chunk_length=100, output_chunk_length=7, n_epochs = 150),
        "TFT": TFTModel(input_chunk_length=100, output_chunk_length=7, add_relative_index=True, n_epochs = 150),
    }
    test.plot()
    for n, m in dl_models.items():
        model = m.fit(unidf)
        preds = m.predict(len(test))
        loss = mse(test, preds)
        results[n] = [preds, loss]
        preds.plot(label=n + f" {loss:.2f}")

    plt.show()
