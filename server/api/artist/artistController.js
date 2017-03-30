var _ = require('lodash');
var Artist = require('./artistModel');
var logger = require('./../../util/logger');


exports.params = function(req, res, next, id) {
  Artist.findOne({nid: id})
    .populate({
        path:'relatedArtists',
        model:'artist'
    })
    .then(function(artist) {
      if (!artist) {
        res.status(404);
        res.json({
          status: 404,
          message: "not found"
        });
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

  //create a unique NID, by checking what the latest nid was and add 1
  Artist.findOne().sort({'nid': -1}).limit(1).then(function(a){
    newArtist.nid = parseInt(a.nid)+1;
    Artist.create(newArtist)
      .then(function(artist) {
        res.json(artist);
      }, function(err) {
        next(err);
      });
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

exports.deleteOne = function(req, res, next) {
  req.artist.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
