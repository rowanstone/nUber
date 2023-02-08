// Admin.js for nUber app
// Defines what all admins in the DB will look like

var mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
mongoose.model('Admin', AdminSchema);

module.exports = mongoose.model('Admin');
