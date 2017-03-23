var express = require('express');
var app = express();
var api = require('./api');
var config = require('./config');
var logger = require('./util/logger');
var morgan = require('morgan');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

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
