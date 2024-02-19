import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, required: true },
    password: { type: String }
},{timestamps: true})

const User = mongoose.model('user', userSchema);
export default User;