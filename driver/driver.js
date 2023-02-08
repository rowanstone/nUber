//Driver file for nUber
//Defines what the driver will look like in the database
var mongoose = require('mongoose');

//Define the attributes for the driver
var DriverSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    carType:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    },
    rider:{
        type: String,
        default: 'No current rider with this driver'
    },
    currentLocation:{
        type: String,
        required: true
    }
});

mongoose.model('driver', DriverSchema);
module.exports = mongoose.model('driver');
