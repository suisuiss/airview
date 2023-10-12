const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());

const DATABASE_URL = 'mongodb+srv://meowo:xRDFRKwNexWznNQg@airview.wz6lfvt.mongodb.net/?retryWrites=true&w=majority';

app.get('/api/aqi-data', async (req, res) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});