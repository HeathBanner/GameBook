const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const Users = require('../models/userInfo/users');

const auth = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      Users.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'The email provided is not registered!' });
          }
          return bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false);
          });
        })
        .catch(() => { console.log('Passport Error!'); });
    }),
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = auth;
