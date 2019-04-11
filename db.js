var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION);
var dbconnection = mongoose.connection;
dbconnection.on('error', console.error.bind(console, 'MONGODB con error'));