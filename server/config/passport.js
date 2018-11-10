import { getSecret } from './secrets'
var passport = require("passport")

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(user, done) {
 done(null, user);
});
passport.use(
 new GoogleStrategy(
  {
   clientID: getSecret('googleClientID'),
   clientSecret: getSecret('googleClientSecret'),
   callbackURL: "http://localhost:3001/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   var userData = {
    email: profile.emails[0].value,
    name: profile.displayName,
    token: accessToken
   };
   console.log(userData)
   done(null, userData);
  }
 )
);
