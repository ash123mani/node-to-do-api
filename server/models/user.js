var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    unique: true,
    valid: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.methods.toJSON = function() {
  var user = this;
  console.log('User from toJSON', user);
  var userObject = user.toObject();
  console.log('User Object is', userObject);
  User;

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';

  var token = jwt.sign({_id: user._id.toHexString(), access}, '123abc').toString();
  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findTokenById = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, '123abc');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({email}).then(user => {
    console.log('found user is', user);
    if (!user) {
      return Promise.reject(err);
    }
    return new Promise((resolve, reject) => {
      return bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject(err);
        }
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('Users', UserSchema);

module.exports = {
  User,
};
