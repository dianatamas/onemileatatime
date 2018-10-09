import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PlacesSchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  rating: Number,
  comment: String,
  tip: String
}, { timestamps: true });

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const TravelSchema = new Schema({
  title: String,
  description: String,
  image: String,
  startDate: Date,
  endDate: Date,
  places: [PlacesSchema]
}, { timestamps: true });



// export our module to use in server.js
export default mongoose.model('Travel', TravelSchema);
