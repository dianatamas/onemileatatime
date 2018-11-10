import express from 'express'
import passport from 'passport'

const authRouter = express.Router()

/* GET Google Authentication API. */
authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

authRouter.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    function(req, res) {
        var token = req.user.token;
        res.redirect("http://localhost:3000?token=" + token)
    }
)

export default authRouter
