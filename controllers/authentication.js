const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  // see if user with the email exists
  User.findOne({email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
  });
  // if a user with email does exist, return an Error
  // if a user with email does NOT exist, create and save user record
  // respond to request indicating the user was created
}
