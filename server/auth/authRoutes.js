var router = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./authController');


router.post('/auth', verifyUser(), controller.auth);

module.exports = router;
