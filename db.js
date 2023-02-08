// db.js for nUber app

// If you want to use your DB connection, just update the fields with
// your MongoDB URI (found on your mLab account)

var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://admin:admin123@ds157923.mlab.com:57923/nuber', { useNewUrlParser: true });

