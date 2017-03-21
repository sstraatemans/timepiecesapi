var _ = require('lodash');
var logger = require('./../../util/logger');

exports.get = function(req, res, next) {
  var artists = [
    {
      id: 1,
      name: "Paul Simon"
    },
    {
      id: 2,
      name: "The Rolling Stones"
    }
  ];
  res.json(artists);
};
