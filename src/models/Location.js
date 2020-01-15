import mongoose, { Schema } from 'mongoose';

const locationSchema = new Schema({
  type: {
    type: String,
    default: 'Point',
    required: true
  },
  coordinates: {
    type: [Number],
    required: 'You must supply coordinates!'
  }
});

export default mongoose.model('Location', locationSchema);
