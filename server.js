// Server code for nUber

// run this code to start the server:
// node server.js

var app = require('./nUber');
var port = process.env.PORT || 3000;


var server = app.listen(port, function() {
    console.log("Express server listening on port " + port);
});

