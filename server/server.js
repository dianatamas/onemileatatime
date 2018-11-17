import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import { getSecret } from './config/secrets'
import travelRouter from './routes/travelRoutes'
import placeRouter from './routes/placeRoutes'
import authRouter from './routes/authRoutes'
require("./config/passport")

// Create the express app
const app = express()

// Set up cookie cookieSession
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [getSecret('cookieKey')]
}))

// Configure API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set up authentication
app.use(passport.initialize())
app.use(passport.session())

// If the user is not authenticated, redirect to Log In Page
// Else, proceed to next step
const authCheck = (req, res, next) => {
  if(!req.user) {
    res.redirect('/')
  }
  else {
    next()
  }
}

app.use(express.static(`/app/client/build/`));

// Set up routes
// For every route, check first that the user is authenticated
app.use('/auth', authRouter)
app.use('/travels', authCheck, travelRouter)
app.use('/places', authCheck, placeRouter)
app.use('/images', authCheck, express.static('images'))
app.get('/*', (req,res) =>{
  let directory = '/app/client/build/index.html'
    res.sendFile(directory);
});
// Connect to MongoDB
mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true })
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Set up the port
const API_PORT = process.env.PORT || 3001;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))
