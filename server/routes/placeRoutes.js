import express from 'express'
import Travel from '../models/travel'

const placeRouter = express.Router()

// Add a place to an existing travel and send back the updated list of travels
placeRouter.post('/add', (req, res) => {
  let travelId = req.body.travelId
  let place = req.body.place
  let travel = Travel.findById(travelId, function (err, travel) {
    if (err) res.status(500).json({ error: err })
    else {
      travel.places.push(place)
      travel.save(function (err) {
        Travel.find({user: req.user.id}, (err, travels) => {
          if (err) res.status(500).json({ error: err })
          else res.status(200).json(travels)
        })
      })
    }
  })
})

placeRouter.post('/add', (req, res) => {
  let travelId = req.body.travelId
  let place = req.body.place
  let travel = Travel.findById(travelId, function (err, travel) {
    if (err) res.status(500).json({ error: err })
    else {
      travel.places.push(place)
      travel.save(function (err) {
        Travel.find({user: req.user.id}, (err, travels) => {
          if (err) res.status(500).json({ error: err })
          else res.status(200).json(travels)
        })
      })
    }
  })
})

placeRouter.delete('/delete', (req, res) => {
  let travelId = req.body.travelId
  let placeId = req.body.placeId
  let travel = Travel.findById(travelId, function (err, travel) {
    if (err) res.status(500).json({ error: err })
    else {
      travel.places.id(placeId).remove()
      travel.save(function (err) {
        Travel.find({user: req.user.id}, (err, travels) => {
          if (err) res.status(500).json({ error: err })
          else res.status(200).json(travels)
        })
      })
    }
  })
})

placeRouter.post('/edit', (req, res) => {
  let travelId = req.body.travelId
  let placeId = req.body.placeId
  let editedPlace = req.body.place
  let travel = Travel.findById(travelId, function (err, travel) {
    if (err) res.status(500).json({ error: err })
    else {
      let place = travel.places.id(placeId)
      console.log(place)
      place = Object.assign(place, editedPlace)
      console.log(place)
      travel.save(function (err) {
        Travel.find({user: req.user.id}, (err, travels) => {
          if (err) res.status(500).json({ error: err })
          else res.status(200).json(travels)
        })
      })
    }
  })
})

export default placeRouter
