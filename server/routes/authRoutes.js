import express from 'express'
import passport from 'passport'

const authRouter = express.Router()

/* GET Google Authentication API. */
authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile"] })
)

authRouter.get(
    "/google/callback",
    passport.authenticate("google"),
    function(req, res) {
      res.redirect('/login?token=' + req.user.token)
    }
)

authRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

export default authRouter
