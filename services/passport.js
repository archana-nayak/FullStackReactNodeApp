const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);// passport callback; you give the id of
  //the model instance in the mongo database and not the google profile id.
});

passport.deserializeUser((id, done) => {
  //you take the id from the cookie ie. reverse of the serialize step 
  //where given the user you returned his id in the database
  //now you take the id and look for the user using the id.
  User.findById(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            //we already have a user with the given profile ID
            done(null, existingUser);
          } else {
            // //we do not have an existing user with the given profile ID
            new User({ googleId: profile.id })
              .save()
              .then(user => { done(null, user); })
          }
      });
    }
  )
);
