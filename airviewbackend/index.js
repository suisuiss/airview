const express = require('express');
const mongoose = require('mongoose');
const cronJob = require('./fetch-aqi-data');

const app = express();

mongoose.connect('mongodb+srv://airview:Airview1234@airview.wz6lfvt.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/aqi', require('./routes/aqi'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});