var mongoose = require('mongoose');
var config = require('./config');

console.log(config);
mongoose.connect(config.db);
var dbconnection = mongoose.connection;
dbconnection.on('error', console.error.bind(console, 'MONGODB con error'));