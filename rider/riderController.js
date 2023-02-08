//riderController.js for nUber app

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Set up google maps distance matrix client
// Run this command in nUber file before using:
// npm install google-distance-matrix
var distance = require('google-distance-matrix');
distance.key('AIzaSyDX2CO3x6y4UuAIwm1eqkT8fcPOI1Z9dro');
distance.units('imperial');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var rider = require('./rider');
var driver = require('../driver/driver.js'); //import the driver file from the driver folder

//Test function for google maps api
router.get('/test', function(req, res) {
           
           // Two dummy variables to test with
           var origins = ['San Antonio TX'];
           var destinations = ['Austin TX'];
           
           // Call the distance matrix function with the two dummy variables
           distance.matrix(origins, destinations, function(err, distances) {
                           // Parse our result to find the distance in miles
                           var result = distances.rows[0].elements[0].distance.text;
                // If you want to return the whole object, replace 'result' with 'distances'
                res.status(200).send(result);
                })
           });


//Gets all drivers (shows all right now, will eventually show all within 10 miles)
router.get('/driver', function (req, res) {
    //console.log(req);
    // variable to hold dummy origin to test with (needs to be changed to rider's location)
    var origins = [req.query.currentLocation];
    // array to hold destinations of all drivers
    var destinations = [];

    if (req.query.carType !== undefined) {
        driver.find({"carType": req.query.carType, "available": "true"}, function (err, driver) {
            console.log(req.query.carType);
            console.log(req.query.currentLocation);
            if (err) {
                return res.status(500).send("There was a problem finding all of the drivers.");
            }

            var n;
            // for every driver in database...
            for (n = 0; n < driver.length; n++) {
                //append their location to destinations array
                destinations[n] = driver[n].currentLocation;
                console.log(destinations[n]);
            }

            distance.matrix(origins, destinations, function (err, distances) {
                // array to hold drivers within 10 miles of origin
                var nearbyDrivers = [];
                var radius = 16094; // 10 miles = 16094 meters,  50 miles = 80468 meters, etc
                var i;
                // for every destination in destinations array, check distance
                for (i = 0; i < destinations.length; i++) {
                    // if distance is less than or equal to 10 miles...
                    if (distances.rows[0].elements[i].distance.value <= radius) {
                        // Append corresponding driver to nearbyDrivers array
                        nearbyDrivers.push(driver[i]);
                    }
                }
                // return only nearby drivers.
                res.status(200).send(nearbyDrivers);
            });

        })
    }

    if (req.query.carType === undefined) {
        driver.find({"available": "true"}, function (err, driver) {
            console.log(req.query.carType);
            console.log(req.query.currentLocation);
            if (err) {
                return res.status(500).send("There was a problem finding all of the drivers.");
            }

            var n;
            // for every driver in database...
            for (n = 0; n < driver.length; n++) {
                //append their location to destinations array
                destinations[n] = driver[n].currentLocation;
                console.log(destinations[n]);
            }

            distance.matrix(origins, destinations, function (err, distances) {
                // array to hold drivers within 10 miles of origin
                var nearbyDrivers = [];
                var radius = 16094; // 10 miles = 16094 meters,  50 miles = 80468 meters, etc
                var i;
                // for every destination in destinations array, check distance
                for (i = 0; i < destinations.length; i++) {
                    // if distance is less than or equal to 10 miles...
                    if (distances.rows[0].elements[i].distance.value <= radius) {
                        // Append corresponding driver to nearbyDrivers array
                        nearbyDrivers.push(driver[i]);
                    }
                }
                // return only nearby drivers.
                res.status(200).send(nearbyDrivers);
            });

        });
    }
});

//Get location of current driver
router.get('/myDriver', function(req, res){
           driver.findOne({name: req.query.name}, function (err, driver) {
                         if(err){
                         console.log("Error: " + err);
                         return res.status(500).send("There was a problem finding the driver");
                         }
                         if(!rider){
                         return res.status(404).send("No rider found by that id");
                         }
                         res.status(200).send(driver);
                         });
           });

//UPDATE DRIVER RATING
router.put('/driver/:id', function (req, res) {
    driver.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, rider) {
        if(err) {
	    return res.status(500).send("There was a problem updating the driver.");
	}
	res.status(200).send(rider);
	});
});

//Return all riders in the database
router.get('/', function (req, res) {
    rider.find(req.query, function (err,rider) {
        if(err){
            return res.status(500).send("There was a problem finding all of the riders.");
        }
        res.status(200).send(rider);
    })
});

//Get a single rider from the database
router.get('/', function(req, res){
    rider.findOne(req.query.name, function (err, rider) {
        if(err){
            console.log("Error: " + err);
            return res.status(500).send("There was a problem finding the rider");
        }
        if(!rider){
            return res.status(404).send("No rider found by that id");
        }
        res.status(200).send(rider);
    });
});

//Delete a rider from the database
router.delete('/:id', function (req, res) {
    rider.findByIdAndRemove(req.params.id, function (err, rider) {
        if(err){
            return res.status(500).send("There was a problem deleting that rider.");
        }
        res(200).send("Rider " + rider.name + " was deleted.");
    });
});


//Update a single rider in the database
router.put('/:id', function (req, res) {
           rider.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, rider) {
              if(err){
                  return res.status(500).send("There was a problem updating the rider.");
              }
              res.status(200).send(rider);
           });
});

module.exports = router;
