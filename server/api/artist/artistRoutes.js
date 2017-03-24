var router = require('express').Router();
var logger = require('./../../util/logger');
var controller = require('./artistController');

router.param('id', controller.params);

router.route('/')
  .get(controller.get);

router.route('/:id')
  .get(controller.getOne);

module.exports = router;
