var _ = require('lodash');
var ChartCategory = require('./chartCategoryModel');
var logger = require('./../../util/logger');


exports.params = function(req, res, next, id) {
  ChartCategory.findById(id)
    .then(function(chartCategory) {
      if (!chartCategory) {
        res.status(404);
        res.json({
          status: 404,
          message: "not found"
        });
      } else {
        req.chartCategory = chartCategory;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  ChartCategory.find({})
    //.populate('author categories')
    .exec()
    .then(function(chartCategories){
      res.json(chartCategories);
    }, function(err){
      next(err);
    });
};

exports.post = function(req, res, next) {
  var newChartCategory = req.body;

  ChartCategory.create(newChartCategory)
    .then(function(chartCategory) {
      res.json(chartCategory);
    }, function(err) {
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var chartCategory = req.chartCategory;
  res.json(chartCategory);
};

exports.updateOne = function(req, res, next) {
  var chartCategory = req.chartCategory;
  var update = req.body;
  _.merge(chartCategory, update);

  chartCategory.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.deleteOne = function(req, res, next) {
  req.chartCategory.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
