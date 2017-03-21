var express = require('express');
var app = express();
var api = require('./api');
var config = require('./config');
var logger = require('./util/logger');

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
