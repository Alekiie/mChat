import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`Connected to Database`);
}).catch(err=>{
    console.error(err);
});