var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_DB_CONNECTION);
    //'mongodb://' + process.env.PROD_DB_CONNECTION + '/nodeexpressapi');
var dbconnection = mongoose.connection;
dbconnection.on('error', console.error.bind(console, 'MONGODB con error'));