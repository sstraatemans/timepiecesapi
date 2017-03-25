var _ = require('lodash');
var Album = require('./albumModel');
var logger = require('./../../util/logger');


exports.params = function(req, res, next, id) {
  Album.findById(id)
    .then(function(album) {
      if (!album) {
        res.status(404);
        res.json({
          status: 404,
          message: "not found"
        });
      } else {
        req.album = album;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Album.find({})
    //.populate('author categories')
    .exec()
    .then(function(albums){
      res.json(albums);
    }, function(err){
      next(err);
    });
};

exports.post = function(req, res, next) {
  var newAlbum = req.body;

  Album.create(newAlbum)
    .then(function(album) {
      res.json(album);
    }, function(err) {
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var album = req.album;
  album.save(function(err, saved) {
    res.json(album);
  })


};

exports.updateOne = function(req, res, next) {
  var album = req.album;
  var update = req.body;
  _.merge(album, update);

  album.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.deleteOne = function(req, res, next) {
  req.album.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
