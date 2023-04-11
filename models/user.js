import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName:String,
    username:String,
    password:String,
    email:String,
    favEpisodes: Array,
    favCharacters: Array,
    favLocations: Array,
})

const User = mongoose.model("User", userSchema);

export default User;