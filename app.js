var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    info: {
      title: 'Node Express Swagger API',
      version: '1.0.0',
      description: 'Endpoints to test the API',
    },
    host: 'localhost:4000',
    basePath: '/api'
  };
  const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
  };
  const swaggerSpec = swaggerJSDoc(options);
  
  

var dotenv = require('dotenv');
dotenv.config();

global.__root   = __dirname + '/'; 
var db = require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

module.exports = app;
