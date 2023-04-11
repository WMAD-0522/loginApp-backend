import mongoose from 'mongoose';

const characterSchema = mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  status: String,
  species: String,
  gender: String
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
