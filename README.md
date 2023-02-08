# nUber
A basic ride-sharing app using Google Maps API created for a TXSTATE Class project in Software Engineering Course

Instructions to run program

the API is hosted on https://snorlax-nuber.herokuapp.com (the base url will give no requests, please refer below to see the various endpoints)

As well the server can be started with the following instructions and ran on a local host under port 3000

Navagate to ~/nUber/ in a terminal and run the following commands

* npm install express --save
* npm install mongoose --save
* npm install body-parser --save
* npm install google-distance-matrix --save
* node server.js

The API is hosted on Localhost:3000

These are nUbers API's end points and parameters

**Get requests**

End Point: /admin
Result: Returns all admins in the database with the following fields
* _id
* name
* email
* password
* V

End point: /admin?name=<Admin Name>
Result: returns information of admin with corresponding name

End point: /admin/driver
Result: Returns all drivers in the database with the following fields
* rating
* available
*  rider
* _id
* Name
* carType
* currentLocation
* __V

End point: /admin/driver?name=<Driver Name>
Result: returns information of driver with corresponding name

End point: /admin/rider
Result: Returns all riders in the database with the following fields
* currentDriver
* cancelTrip
* _Id
*  name
*  __V
* currentLocation
* setDestination

End point: /admin/rider?name=<Rider Name>
Result: returns information of rider with corresponding name

End Point: /rider/driver?currentLocation=<Rider Location>
Result: returns all drivers within 10  miles

End Point: /rider/driver?currentlocation=<Rider Location>&carType=<Economy or Luxury>
Result: returns all drivers within 10  miles of the specific car type

End Point: /rider/myDriver=<Driver Name>
Result: return information of driver with corresponding name

**Post requests**

End Point /admin
Result: add admin with the following fields passed through the body
* name
* email
* password

End Point /admin/driver
Result: add driver with the following fields passed through the body
* rating
* available
* rider
* name
* carType
* currentLocation

End Point /admin/rider
Result: add rider with the following fields passed through the body
* currentDriver
* cancelTrip
* name
* currentLocation
* setDestination

**Delete requests**

End Point: /admin
Result: delete admin with id by passing through the body

End Point: /admin/driver
Result: delete a driver with id by passing through the body

End Point: /admin/rider
Result: delete a rider with id by passing through the body

**Put Requests**

End Point: /admin/<Admin ID>
Result: Update any or all of the following admin fields by passing through the body
* name
* email
* password

End Point: /admin/driver/<Driver ID>
Result: Update any or all of the following driver fields by passing through the body
* rating
* available
* rider
* Name
* carType
* currentLocation

End Point: /admin/rider/<Rider ID>
Result: Update any or all of the following rider fields by passing through the body
* currentDriver
* cancelTrip
* name
* currentLocation
* setDestination

End Point: /driver/<Driver ID>
Result: Update driver availability field by passing through the body
* available

End Point: /driver/rider/<Rider ID>
Result: Cancel rider request field by passing through the body
* cancelTrip

End Point: /rider/driver/<Driver ID>
Result: Update driver rating field by passing through the body
* rating
