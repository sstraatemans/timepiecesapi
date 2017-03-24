var config = require('./../config');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
// setup global middleware here

module.exports = function(app) {
  if(config.logging){
    app.use(morgan('dev')); // log every request to the console
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
};
