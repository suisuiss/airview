const express = require('express');
const mongoose = require('mongoose');
const cronJob = require('./fetch-aqi-data');
const subscriptionRoute = require('./routes/subscription'); 
const cors = require('cors'); 
const webpush = require('web-push');


const app = express();
app.use(cors());
mongoose.connect('mongodb+srv://airview:Airview1234@airview.wz6lfvt.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(express.json());

app.use('/aqi', require('./routes/aqi'));
app.get('/test',async (req, res) => {
  res.send('server is running ')
})
app.post('/subscribe', subscriptionRoute );


app.post('/sub', async (req,res)=>{
    res.send('subbed')
    const subscription = req.body;
    console.log("sub",subscription);
    const payload = JSON.stringify({ title: "Weather alerts", body : "Air Quality Exceeds the limit, Please wear masks" });
  webpush
    .sendNotification(subscription, "Air Quality Exceeds the limit, Please wear masks" )
    .then(() => {
      console.log('Push notification sent successfully');
    })
    .catch(err => {
      console.error('Failed to send push notification:', err);
    });

});
app.get('/send', subscriptionRoute );


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