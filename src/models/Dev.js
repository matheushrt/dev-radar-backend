import mongoose, { Schema } from 'mongoose';
import { Location } from './';

const devSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  github_username: {
    type: String,
    trim: true
  },
  bio: String,
  avatar_url: {
    type: String,
    trim: true
  },
  techs: [String],
  location: {
    type: Location.schema,
    index: '2dsphere'
  }
});

devSchema.pre('save', async function(next) {
  const { github_username, constructor } = this;
  const duplicate = await constructor.findOne({ github_username });

  if (duplicate) throw Error('Github username already exists.');
  next();
});

export default mongoose.model('Dev', devSchema);
