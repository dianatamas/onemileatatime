import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { getSecret } from './secrets'
import Travel from './models/travel';

// Create the instances
const app = express();
const router = express.Router();
const travelRouter = express.Router();

// Set up images folder to serve images
app.use('/images', express.static('images'));

// Configure API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the route path & initialize the API
router.get('/', (req, res) => {
  Travel.find((err, travels) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: travels });
  });
});
// Use our router configuration when we call /api
app.use('/api', router);

travelRouter.post('/add', (req, res) => {
  console.log('api done');
  let travel = new Travel(req.body);
  travel.save();
  res.status(201).send(travel)
})
app.use('/travels', travelRouter);

// Connect to MongoDB
mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set up the port
const API_PORT = 3001;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
