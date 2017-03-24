var router = require('express').Router();
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('./../config');
var checkToken = expressJwt({ secret: config.secrets.jwt });
var User = require('./../api/user/userModel');





router.use('/', require('./authRoutes'));

module.exports = router;
