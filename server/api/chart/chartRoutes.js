var router = require('express').Router();
var logger = require('./../../util/logger');
var controller = require('./chartController');
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(checkUser, controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.updateOne)
  .delete(checkUser, controller.deleteOne);

  router.route('/:id/albums')
    .get(controller.getAlbums)
    .post(controller.setAlbums)


module.exports = router;
