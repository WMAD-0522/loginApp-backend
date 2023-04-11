import mongoose from 'mongoose';

const episodeSchema = mongoose.Schema({
  id: Number,
  name: String,
  air_date: String,
  episode: String,
});

const Episode = mongoose.model('Episode', episodeSchema);

export default Episode;
