var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  salt: {
    type: String
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.salt = bcrypt.genSaltSync(10);
  this.password = this.encryptPassword(this.password, this.salt);
  next();
});

UserSchema.methods = {
  // check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  // hash the passwords
  encryptPassword: function(plainTextPword, salt) {
    if (!plainTextPword) {
      return ''
    } else {
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },

  toJSON: function() {
    var obj = this.toObject()
    delete obj.password;
    delete obj.salt;
    return obj;
  }
};

module.exports = mongoose.model('user', UserSchema);
