 
// models/Sport.js
import mongoose from 'mongoose';

const sportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Field to map sport to the ML model's expected identifier
  mlIdentifier: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true,
});

const Sport = mongoose.model('Sport', sportSchema);
export default Sport;