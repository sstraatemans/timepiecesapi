var User = require('./userModel');
var logger = require('./../../util/logger');

exports.get = function(req, res, next) {
  User.find({})
    .select('-password')
    .exec()
    .then(function(users){
      res.json(users);
    }, function(err){
      next(err);
    });
};

exports.post = function(req, res, next) {
  var newUser = new User(req.body);

  //check if user exists
  User.findOne({username: newUser.username})
    .exec()
    .then(function(user){
      if(!user){
        User.create(newUser)
          .then(function(user) {
            res.json(user.toJSON());
          }, function(err) {
            next(err);
          });
      }else{
        res.status(409);
        res.json({
          code: 409,
          message: 'username already exists'
        });
      }
    });


};
