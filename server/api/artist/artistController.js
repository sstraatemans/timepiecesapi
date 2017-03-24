var _ = require('lodash');
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

exports.post = function(req, res, next) {
  var newArtist = req.body;

  Artist.create(newArtist)
    .then(function(artist) {
      res.json(artist);
    }, function(err) {
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var artist = req.artist;
  res.json(artist);
};

exports.updateOne = function(req, res, next) {
  var artist = req.artist;
  var update = req.body;
  _.merge(artist, update);

  artist.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};
