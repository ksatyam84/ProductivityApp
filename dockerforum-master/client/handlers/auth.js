const db = require('../models');
const passport = require('passport');
const LocalStrategy = require('passport-local');

exports.signup = (req, res) => {
  db.User.register(
    new db.User({
      email: req.body.email, 
      username: req.body.username
    }), req.body.password, (err, user) => {
      if(err) {
        return next(err);  
      }
      passport.authenticate('local')(req, res, () => {
        const user = req.user;
        return res.status(200).json({
          id: user.id, 
          username: user.username
        });
      });
  });
};

exports.signin = (req, res) => {
  passport.authenticate('local')(req, res, () => {
    const user = req.user;
    return res.status(200).json({
      id: user.id, 
      username: user.username
    });
  }); 
};