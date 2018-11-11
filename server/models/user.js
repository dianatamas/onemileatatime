import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  name: String,
  token: String
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('User', UserSchema);
