import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { getSecret } from './secrets'
import Travel from './models/travel';

// Create the instances
const app = express();
const travelRouter = express.Router();

// Set up images folder to serve images
app.use('/images', express.static('images'));

// Configure API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

travelRouter.get('/', (req, res) => {
  Travel.find((err, travels) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: travels });
  });
});

travelRouter.post('/add', (req, res) => {
  console.log('api done');
  let travel = new Travel(req.body);
  travel.save();
  res.status(201).send(travel)
});

travelRouter.put('/edit/:id', (req, res) => {
  let id = req.params.id
  Travel.updateOne({ _id: id }, { $set: req.body}, (err, rawResponse) => Travel.find((err, travels) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: travels });
  }));
});

app.use('/travels', travelRouter);

// Connect to MongoDB
mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set up the port
const API_PORT = 3001;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
