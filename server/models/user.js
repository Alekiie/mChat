import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, required: true },
    password: { type: String }
})

const User = mongoose.model('user', userSchema);
export default User;