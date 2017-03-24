var Artist = require('./artistModel');
var logger = require('./../../util/logger');

exports.params = function(req, res, next, id) {
  Artist.findById(id)
    .then(function(artist) {
      if (!artist) {
        next(new Error('No artist with that id'));
      } else {
        req.artist = artist;
        next();
      }
    }, function(err) {
      next(err);
    });
};

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

exports.getOne = function(req, res, next) {
  var artist = req.artist;
  res.json(artist);
};
