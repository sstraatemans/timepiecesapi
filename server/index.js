var express = require('express');
var app = express();
var api = require('./api');
var auth = require('./auth');
var config = require('./config');
var logger = require('./util/logger');
var morgan = require('morgan');
var session = require('express-session');


//mongoose setup
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);

require('./util/middleware')(app);

//setup auth api
app.use('/', auth);
// setup the api
app.use('/api/v1', api);

//gobal error handling
app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('so long');
});


module.exports = app;
