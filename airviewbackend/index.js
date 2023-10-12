const express = require('express');
const mongoose = require('mongoose');
const cronJob = require('./fetch-aqi-data');

const app = express();

mongoose.connect('mongodb+srv://airview:Airview1234@airview.wz6lfvt.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/aqi', require('./routes/aqi'));

app.get('/aqiChart', async (req, res) => {
    try {
      const client = new MongoClient(DATABASE_URL, { useUnifiedTopology: true });
      await client.connect();
      
      const db = client.db('AQIData'); // Your database name
      const collection = db.collection('historicAqi'); // Your collection name
      
      const data = await collection.find({}).toArray();
      
      client.close();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});