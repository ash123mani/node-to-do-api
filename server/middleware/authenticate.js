var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  console.log('token is', token);

  User.findTokenById(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      console.log('user is', user);
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).send();
    });
};

module.exports = {authenticate};
