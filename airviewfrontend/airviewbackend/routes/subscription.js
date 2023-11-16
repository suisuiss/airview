
const express = require('express');
const router = express.Router();

// Import the web-push library and other necessary dependencies
const webpush = require('web-push');
const subscriptionController = require('../controllers/subscriptionController');

// Define a route to handle push notification subscription requests
router.post('/subscribe', subscriptionController.subscribe);
router.get('/send' , subscriptionController.send)

module.exports = router;
