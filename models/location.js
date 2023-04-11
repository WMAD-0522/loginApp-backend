import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
  id: Number,
  name: String,
  type: String,
  dimension: String,
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
