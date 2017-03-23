var Artist = require('./artistModel');
var logger = require('./../../util/logger');

exports.get = function(req, res, next) {
  Artist.find({})
    //.populate('author categories')
    .exec()
    .then(function(artists){
      res.json(artists);
    }, function(err){
      next(err);
    });
};
