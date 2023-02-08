//Rider file for nUber
//Defines what the rider will look like in the database
var mongoose = require('mongoose');

//Define the attributes for the driver
var RiderSchema = new mongoose.Schema({
    name:{
        type: String,
       required: true
    },
    currentDriver:{
        type: String,
        required: true,
        default: "No current driver for this rider"
    },
    cancelTrip:{
        type: Boolean,
        default: false
    },
    destination:{
        type: String,
        required: true
    },
    currentLocation:{
        type: String,
        required: true
    }
});
mongoose.model('rider', RiderSchema);

module.exports = mongoose.model('rider');
