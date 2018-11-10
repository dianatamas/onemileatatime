import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { getSecret } from './config/secrets'
import travelRouter from './routes/travelRoutes'
import placeRouter from './routes/placeRoutes'
import authRouter from './routes/authRoutes'

// Create the express app
const app = express()

// Configure API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set up authentication
app.use(passport.initialize())
require("./config/passport")

// Set up routes
app.use('/auth', authRouter)
app.use('/travels', travelRouter)
app.use('/places', placeRouter)
app.use('/images', express.static('images'))

// Connect to MongoDB
mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true })
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Set up the port
const API_PORT = 3001;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))
