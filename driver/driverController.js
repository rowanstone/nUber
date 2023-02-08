//driverController.js for nUber app
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var driver = require('./driver');
var rider = require('../rider/rider.js');

// UPDATES THE DRIVERS SPECIFIED ATTRIBUTE
router.put('/:id', function (req, res) {
    driver.findByIdAndUpdate(req.params.id , req.body, {new: true} ,function (err, driver) {
        if(err){
            return res.status(500).send("There was a problem updating the driver availability.");
        }
        res.status(200).send(driver);
    });
});

//DRIVER UPDATES A SPECIFIED ATTRIBUTE
router.put('/rider/:id', function (req, res) {
    rider.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, rider){
        if(err){
            return res.status(500).send("There was a problem cancelling the rider request.");
        }
        res.status(200).send(rider);
    }) ;
});

module.exports = router;