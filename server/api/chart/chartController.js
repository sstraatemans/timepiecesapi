var _ = require('lodash');
var Chart = require('./chartModel');
var logger = require('./../../util/logger');


exports.params = function(req, res, next, id) {
  Chart.findOne({nid: id}, '-albums')
    .populate([{
        path:'category',
        model:'chartCategory'
    },{
        path:'albums',
        model:'album'
    }])
    .then(function(chart) {
      if (!chart) {
        res.status(404);
        res.json({
          status: 404,
          message: "not found"
        });
      } else {
        req.chart = chart;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Chart.find({}, '-albums')
    .populate({
        path:'category',
        model:'chartCategory'
    })
    .exec()
    .then(function(charts){
      res.json(charts);
    }, function(err){
      next(err);
    });
};

exports.post = function(req, res, next) {
  var newChart = req.body;

  //create a unique NID, by checking what the latest nid was and add 1
  Chart.findOne().sort({'nid': -1}).limit(1).then(function(a){
    newChart.nid = parseInt(a.nid)+1;
    Chart.create(newChart)
      .then(function(chart) {
        res.json(chart);
      }, function(err) {
        next(err);
      });
  });

};

exports.getOne = function(req, res, next) {
  var chart = req.chart;
  res.json(chart);
};

exports.getAlbums = function(req, res, next) {
  Chart
    .findOne({ "nid": req.chart.nid }, '-nid -title -year -category -body ')
    .populate({
        path:'albums',
        model:'album'
    })
    .exec(function(err, n){
      res.json(n);
    });
};

exports.setAlbums = function(req, res, next) {
  //this will set the albums
};


exports.updateOne = function(req, res, next) {
  var chart = req.chart;
  var update = req.body;
  _.merge(chart, update);

  chart.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.deleteOne = function(req, res, next) {
  req.chart.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
