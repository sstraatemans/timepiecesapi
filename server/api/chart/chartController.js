var _ = require('lodash');
var Chart = require('./chartModel');
var logger = require('./../../util/logger');


exports.params = function(req, res, next, id) {
  Chart.findById(id)
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
  Chart.find({})
    //.populate('author categories')
    .exec()
    .then(function(charts){
      res.json(charts);
    }, function(err){
      next(err);
    });
};

exports.post = function(req, res, next) {
  var newChart = req.body;

  Chart.create(newChart)
    .then(function(chart) {
      res.json(chart);
    }, function(err) {
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var chart = req.chart;
  res.json(chart);
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
