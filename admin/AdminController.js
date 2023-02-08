// AdminController.js for nUber app
// This is where we define the RESTful operations for our app

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Admin = require('./Admin.js');
var driver = require('../driver/driver.js'); //import the driver file from the driver folder
var rider = require('../rider/rider.js');

// CREATES A NEW ADMIN
router.post('/', function(req, res) {

    Admin.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        },

        function(err, admin) {
            if (err) {
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            res.status(200).send(admin);
        });
});

// RETURNS ALL ADMINS IN THE DATABASE
router.get('/', function(req, res) {

    Admin.find(req.query, function(err, admin) {
        if(err) {
            return res.status(500).send("There was a problem finding the Admin.");
        }
        res.status(200).send(admin);
    });
});

// GETS A SINGLE ADMIN FROM THE DATABASE
router.get('/', function(req, res) {

    Admin.findOne(req.query.name, function(err, admin) {
        if(err) {
            console.log("Error: " + err);
            return res.status(500).send("There was a problem finding the user.");
        }
        if(!admin) {
            return res.status(404).send("No admin found.");
        }
        res.status(200).send(admin);
    });
});

// DELETES AN ADMIN FROM THE DATABASE BASED ON QUERY PARAMETERS
router.delete('/', function(req, res) {

    Admin.findOneAndDelete(req.query, function(err, admin) {
        if(err) {
            return res.status(500).send("There was a problem deleting the admin.");
        }
        res.status(200).send("Admin " + admin.name + " was deleted.");
    });
});

// UPDATES A SINGLE ADMIN IN THE DATABASE
router.put('/:id', function (req, res) {

    Admin.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, admin) {
        if (err) {
            return res.status(500).send("There was a problem updating the admin.");
        }
        res.status(200).send(admin);
    });
});

// CREATE A NEW DRIVER
router.post('/driver', function(req, res){
    driver.create({
            name: req.body.name,
            carType: req.body.carType,
            rating: req.body.rating,
            available: req.body.available,
            rider: req.body.rider,
            currentLocation: req.body.currentLocation
            //geometry: req.body.geometry
        },
        function(err, driver){
            if(err){
                return res.status(500).send("There was a problem adding the information to the driver database");
            }
            res.status(200).send(driver);
        });
});

// RETURNS ALL DRIVERS
router.get('/driver', function (req, res) {
    driver.find(req.query, function (err,driver) {
        if(err){
            return res.status(500).send("There was a problem finding all of the drivers.");
        }
        res.status(200).send(driver);
    })
});

// RETURN A SINGLE DRIVER
router.get('/driver', function(req, res){
    driver.findOne(req.query.name, function (err, driver) {
        if(err){
            return res.status(500).send("There was a problem finding the driver");
        }
        if(!driver){
            return res.status(404).send("No driver found by that id");
        }
        res.status(200).send(driver);
    });
});

// DELETE A DRIVER
router.delete('/driver', function (req, res) {
    driver.findOneAndDelete(req.query, function (err, driver) {
        if(err){
            return res.status(500).send("There was a problem deleting that driver.");
        }
        res.status(200).send("Driver " + driver.name + " was deleted.");
    });
});

//UPDATE A SINGLE DRIVER
router.put('/driver/:id', function (req, res) {
    driver.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, driver) {
        if(err){
            return res.status(500).send("There was a problem updating the driver.");
        }
        res.status(200).send(driver);
    });
});

// CREATE A NEW RIDER   // THIS WORKS. DO NOT CHANGE
router.post('/rider', function(req, res){
    rider.create({
            name: req.body.name,
			currentDriver: req.body.currentDriver,
            cancelTrip: req.body.cancelTrip,
            destination: req.body.destination,
            currentLocation: req.body.currentLocation
        },
        function(err, rider){
            if(err){
                return res.status(500).send("There was a problem adding the information to the rider database");
            }
            res.status(200).send(rider);
        });
});

// RETURNS ALL RIDERS
router.get('/rider', function (req, res) {
    rider.find(req.query, function (err,rider) {
        if(err){
            return res.status(500).send("There was a problem finding all of the riders.");
        }
        res.status(200).send(rider);
    })
});

// RETURN A SINGLE RIDER
router.get('/rider', function(req, res){
    rider.findOne(req.query.name, function (err, rider) {
        if(err){
            return res.status(500).send("There was a problem finding the rider");
        }
        if(!rider){
            return res.status(404).send("No rider found by that id");
        }
        res.status(200).send(rider);
    });
});

// DELETE A RIDER
router.delete('/rider', function (req, res) {
    rider.findOneAndDelete(req.query, function (err, rider) {
        if(err){
            return res.status(500).send("There was a problem deleting that rider.");
        }
        res.status(200).send("Rider " + rider.name + " was deleted.");
    });
});

//UPDATE A SINGLE RIDER
router.put('/rider/:id', function (req, res) {
    rider.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, rider) {
        if(err){
            return res.status(500).send("There was a problem updating the rider.");
        }
        res.status(200).send(rider);
    });
});

module.exports = router;
