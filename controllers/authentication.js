const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  // see if user with the email exists

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password.'})
  }
  User.findOne({email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // if a user with email does exist, return an Error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
  });
  // if a user with email does NOT exist, create and save user record
  const user = new User({
    email: email,
    password: password
  });

  user.save(function(err) {
    if (err) { return next(err); }
    res.json({ success: true });
  });
  // respond to request indicating the user was created
}
