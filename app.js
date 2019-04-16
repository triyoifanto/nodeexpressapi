var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var dotenv = require('dotenv');
dotenv.config();
var config = require('./config');

// swagger configuration
const swaggerDefinition = {
    info: {
      title: 'CDC Node Express Swagger API',
      version: '1.0.0',
      description: 'Endpoints to test the API',
    },
    host: 'localhost:' + config.port,
    basePath: '/api',
    securityDefinitions: {
        auth: {
          type: 'apiKey',
          name: 'x-access-token',
          in: 'header',
        },
      },
    security: [
        { auth: [] }
    ]
  };
  const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './module/**/*.js'],
  };
  // swagger doc config
  const swaggerSpec = swaggerJSDoc(options);  

global.__root   = __dirname + '/'; 
var db = require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// load swagger UI
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
