import { getSecret } from './secrets'
import User from '../models/user'
import passport from 'passport'

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then((user) =>  done(null, user))
})

passport.use(
 new GoogleStrategy(
  {
   clientID: getSecret('googleClientID'),
   clientSecret: getSecret('googleClientSecret'),
   callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // check if user is already in db
    User.findOne({googleId: profile.id})
    .then((currentUser) => {
      // check if user is already in db
      if (currentUser) {
        done(null, currentUser)
      }
      // if user doesn't already exist, create a new one
      else {
        new User({
          googleId: profile.id,
          name: profile.displayName,
          token: accessToken
        })
        .save()
        .then((newUser) => {
          done(null, newUser)
        })
      }
    })
  })
)
