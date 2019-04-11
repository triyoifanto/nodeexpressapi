var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:P4ssw0rd@ds137596.mlab.com:37596/nodeexpressapi');
var dbconnection = mongoose.connection;
dbconnection.on('error', console.error.bind(console, 'MONGODB con error'));