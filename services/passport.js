const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // passport callback; you give the id of
  //the model instance in the mongo database and not the google profile id.
});

passport.deserializeUser((id, done) => {
  //you take the id from the cookie ie. reverse of the serialize step
  //where given the user you returned his id in the database
  //now you take the id and look for the user using the id.
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true //tell google strategy that if it runs
      //across a proxy then its fine to trust it and use
      //http: (as its behind a load balancer and within the same
      //trusted nework now)
    },
    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleId: profile.id })
    //     .then(existingUser => {
    //       if (existingUser) {
    //         //we already have a user with the given profile ID
    //         done(null, existingUser);
    //       } else {
    //         // //we do not have an existing user with the given profile ID
    //         new User({ googleId: profile.id })
    //           .save()
    //           .then(user => { done(null, user); })
    //       }
    //   });
    // }
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        //we already have a user with the given profile ID
        return done(null, existingUser);
      } //else not needed as we return if user exists
      // //we do not have an existing user with the given profile ID
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
