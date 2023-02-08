// nUber app
// Follows the tutorial at:
// https://hackernoon.com/restful-api-design-with-node-js-26ccf66eab09


var express = require('express');
var app = express();
var db = require('./db'); //Connects the app to the DB
//var driver = require('./driver'); //Connects the app to the  driver
//var rider = require('./rider'); //Connects the app to the rider
//var admin = require('./Admin'); // Connects the app to the admin

var AdminController = require('./admin/AdminController');
var driverController = require('./driver/driverController');
var riderController = require('./rider/riderController');

app.use('/admin', AdminController);
app.use('/driver', driverController);
app.use('/rider', riderController);// This works! DO NOT CHANGE

module.exports = app;


