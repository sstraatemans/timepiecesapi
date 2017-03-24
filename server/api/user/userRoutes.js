var router = require('express').Router();
var logger = require('./../../util/logger');
var controller = require('./userController');
var auth = require('./../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/me')
  .get(checkUser, controller.me);

module.exports = router;
