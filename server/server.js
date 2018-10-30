import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { getSecret } from './secrets'
import Travel from './models/travel'

// Create the instances
const app = express()
const travelRouter = express.Router()

// Set up images folder to serve images
app.use('/images', express.static('images'))

// Configure API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Get the list of all existing travels
travelRouter.get('/', (req, res) => {
  Travel.find((err, travels) => {
    if (err) res.status(500).json({ error: err })
    else res.status(200).json(travels)
  })
})

// Add a travel to the database and send back the updated list of travels
travelRouter.post('/add', (req, res) => {
  let travel = new Travel()
  travel.save()
  Travel.create(req.body, (err, travel) => {
    if (err) res.status(500).json({ error: err })
    else {
      Travel.find((err, travels) => {
        if (err) res.status(500).json({ error: err })
        else res.status(200).json(travels)
      })
    }
  })
})

// Edit an existing travel and send back the updated list of travels
travelRouter.post('/edit/:id', (req, res) => {
  let id = req.params.id
  Travel.updateOne({ _id: id }, { $set: req.body}, (err, rawResponse) => {
    if (err) res.status(500).json({ error: err })
    else {
      Travel.find((err, travels) => {
        if (err) res.status(500).json({ error: err })
        else res.status(200).json(travels)
      })
    }
  })
})

// Delete a travel and send back the updated list of travels
travelRouter.delete('/delete/:id', (req, res) => {
  let id = req.params.id
  Travel.deleteOne({ _id: id }, (err) => {
    if(err) res.status(500).json({ error: err })
    else {
      Travel.find((err, travels) => {
        if (err) res.status(500).json({ error: err })
        else res.status(200).json(travels)
      })
    }
  })
})

// Set up the travelRouter
app.use('/travels', travelRouter)

// Connect to MongoDB
mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true })
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Set up the port
const API_PORT = 3001;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))
