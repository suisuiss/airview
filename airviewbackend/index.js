const express = require('express');
const mongoose = require('mongoose');
// const cronJob = require('./fetch-aqi-data');
const subscriptionRoute = require('./routes/subscription');
const webpush = require('web-push');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const cron = require('cron').CronJob;
const fetch = require('node-fetch');

const app = express();

app.use(cors());
mongoose.connect('mongodb+srv://airview:Airview1234@airview.wz6lfvt.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'subscription',
});
app.use(express.json());
const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));


const DATABASE_URL = 'mongodb+srv://meowo:xRDFRKwNexWznNQg@airview.wz6lfvt.mongodb.net/?retryWrites=true&w=majority';

app.use('/aqi', require('./routes/aqi'));
app.get('/test', async (req, res) => {
  res.send('server is running ')
})
// app.post('/subscribe', subscriptionRoute );
//use for define DB schema
const subscriptionSchema = new mongoose.Schema({
  endpoint: String,
  expirationTime: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});
const SubscriptionModel = mongoose.model('subscription', subscriptionSchema, 'subscription');


//use for subscribe function
app.post('/subscribe', async (req, res) => {

  try {
    const payload = req.body
    console.log("payload", payload)
    //sending payload to database

    const subscriptionInstance = new SubscriptionModel(payload);
    // Save the subscription to MongoDB
    await subscriptionInstance.save();
    console.log('mongo DB saved')
    res.send('payload received');
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
})
//use for unsubscribe
app.post('/unsubscribe', async (req, res) => {

  try {
    const payload = req.body
    console.log("remove payload", payload)
    //Find and remove
    const deletedSubscription = await SubscriptionModel.findOneAndDelete({
      endpoint: payload.endpoint,
    });
    
    if (deletedSubscription) {
      console.log('Subscription removed from database:', deletedSubscription);
      res.json({ success: true, message: 'Subscription removed successfully' });
    } else {
      console.log('Subscription not found in database');
      res.json({ success: false, message: 'Subscription not found in database' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
})
 

//use to send AQI noti
app.post('/sub', async (req, res) => {

  const data = req.body;
  console.log("sub", data);
  const aqi = data.aqi
  // res.send(subscription)
  // const payload = JSON.stringify({ title: "Weather alerts", body : "Air Quality Exceeds the limit, Please wear masks" });
  webpush
    .sendNotification(data.subscription, "Current AQI is " + aqi + ", Please wear masks")
    .then(() => {
      console.log('Push notification sent successfully');
    })
    .catch(err => {
      console.error('Failed to send push notification:', err);
    });
  res.send('subscription payload saved')
});


//use for rain noti
app.post('/rainnoti', async (req, res) => {
  res.send('sent rainnoti')
  const rqData = req.body;
  console.log("rain ", rqData.time)
  const expectedTime = rqData.time
  const subData = rqData.subscription
  // console.log("endpoint is " + subData.endpoint)
  webpush
    .sendNotification(rqData, "Rain is expected around " + expectedTime)
    .then(() => {
      console.log('Push notification sent successfully');
    })
    .catch(err => {
      console.error('Failed to send push notification:', err);
    });




});
app.get('/send', subscriptionRoute);


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

/*cron to run every 30 minutes*/

// Create a cron job that runs every minute//
const cronJob = new cron('*/60 * * * *', async () => {
  console.log('fectching AQI');
  getAQI();
  const unhealthyLv = 60 ;
  console.log('checking');
  const aqi = await getAQI();
  console.log("AQI is", aqi)
  if (aqi > unhealthyLv ) {
    console.log(aqi, '>', unhealthyLv,  'Noti')
    aqiNoti(aqi);
  } else if (aqi < 50) {
    console.log(aqi, '<', unhealthyLv , 'Not Noti')
  }
  console.log('checked')

});

// Start the cron job
cronJob.start();

const getAQI = async () => {
  try {
    const apiKey = '93251e1c93612cabd3b0bd3214148bb64039c4ec';
    const apiUrl = `http://api.waqi.info/feed/bangkok/?token=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.data.aqi;
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    throw error; // Propagate the error to the calling function
  }
};

const aqiNoti = async (aqi) => {
  try {
    // Retrieve all subscriptions from MongoDB
    const subscriptions = await SubscriptionModel.find();
    console.log(subscriptions)
    // Payload for the push notification
    const notificationPayload = {
      title: 'New AQI Notification',
      body: 'The AQI level is above 50. Take necessary precautions.',
    };

    // Loop through subscriptions and send notifications
    for (const subscription of subscriptions) {

  await webpush
        .sendNotification(subscription, "Current AQI is " + aqi +  ", Please wear mask")
        .then(() => {
          console.log('Push notification sent successfully');
        })
        .catch(err => {
          console.error('Failed to send push notification:', err);
        });
    }

    console.log('Notifications sent to all subscribers.');
  } catch (error) {
    console.error('Error sending notifications to subscribers:', error);
  }
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});