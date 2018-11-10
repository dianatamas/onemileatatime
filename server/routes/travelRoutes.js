import express from 'express'
import Travel from '../models/travel'

const travelRouter = express.Router()

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

export default travelRouter
