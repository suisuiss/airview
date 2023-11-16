const webpush = require('web-push');

// Replace with your VAPID keys
// const vapidKeys = webpush.generateVAPIDKeys();
const vapidKeys = {
    publicKey:'BCS5nEpceVPUCj2GyPSEL0rOmhi4dfE_dYxTOY3pIm_C_o3NdE4_zLk7_7aAooWKCgEes9oAWmlTUcwb_t6Kfvo',
    privateKey:'ozu6ARHHsJRNC2WYDduIVwMkDbZd14PgehqyL6sW52I'
}

webpush.setVapidDetails('mailto:nontakorn223@gmail.com',vapidKeys.publicKey,vapidKeys.privateKey);
console.log('Public VAPID Key:',vapidKeys.publicKey);
console.log('Private VAPID Key:',vapidKeys.privateKey);

const subDb = []
// Function to handle push notification subscription
const subscribe = async (req, res) => {
  const subscription = req.body;
  console.log(subscription)
  // const payload = JSON.stringify({ title: "Push Test", body : "thisisTest" });
 
  // webpush
  //   .sendNotification(subscription, payload)
  //   .catch(err => console.error(err));
};
  // Create payload
  // const payload = JSON.stringify({ title: "Push Test", body : "thisisTest" });
  // const payload = JSON.stringify({
  //   title: 'weather alerts',
  //   body: 'This is a test notification from your server!',
  // });

  // Pass object into sendNotification
  // webpush
  //   .sendNotification(subscription, payload)
  //   .catch(err => console.error(err));

  // res.json({status:'success' ,message :  "message"})
  // webpush
  //   .sendNotification(subscription, payload)
  //   .then(() => {
  //     res.status(200).json({ message: 'Test notification sent successfully' });
  //   })
  //   .catch((error) => {
  //     console.error('Error sending test notification:', error);
  //     res.status(500).json({ error: 'An error occurred while sending the test notification' });
  //   });
 

const send = async (req, res) => {
  
  // Create payload
  const payload = JSON.stringify({ title: "Push Test", body : "thisisTest" });
  
  webpush
    .sendNotification(subDb[0], payload)
    .catch(err => console.error(err));

  res.json({status:'succeed' ,message :  "msg sent"});
  console.log(subDb[0])
  }


module.exports = {
  subscribe,
  send
};
