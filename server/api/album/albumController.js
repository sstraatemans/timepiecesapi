var _ = require('lodash');
var Album = require('./albumModel');
var logger = require('./../../util/logger');


exports.params = function(req, res, next, id) {
  Album.findOne({nid: id})
    .populate({
        path:'artist',
        model:'artist'
    })
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
    .limit(50)
    .populate({
        path:'artist',
        model:'artist'
    })
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

  //create a unique NID, by checking what the latest nid was and add 1
  Album.findOne().sort({'nid': -1}).limit(1).then(function(a){
    newAlbum.nid = parseInt(a.nid)+1;
    Album.create(newAlbum)
      .then(function(album) {
        res.json(album);
      }, function(err) {
        next(err);
      });
  });
};

exports.getOne = function(req, res, next) {
  var album = req.album;
  res.json(album);


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
