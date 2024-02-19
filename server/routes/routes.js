import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
//import user schema
import User from '../models/user.js';


export const router = express.Router();

const jwt_secret = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);


router.get('/test', (req, res) => {
    return res.sendStatus(200);
});

router.get('/profile', (req, res)=>{
    const token = req.cookies?.token;
    if(token){
        jwt.verify(token, jwt_secret, {}, (err, userData)=>{
            if(err) throw err;
    
            res.status(200).json(userData);
        })
    } else{
        res.status(401).json(`no token`)
    }
})

router.post('/login', async(req, res)=>{
    const { username, password } = req.body;
    const foundUser = User.findOne({username});
})

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hash = bcrypt.hashSync(password, salt);
        
        //check to see if the username or email is already in use
        let existingUser = await User.findOne({$or: [{username}, {email}]});  
        if(existingUser) { 
            return res.status(409).json('Username or Email is already in use'); 
        }

        //*********ALTERNATIVE*********** */
        // const newUser = new User({
        //     username,
        //     email,
        //     password : hash
        // });
        // const savedUser = await newUser.save();
        // res.status(201).json(savedUser);
        const createdUser = await User.create({ username, email, password: hash });
        jwt.sign({ userId: createdUser._id, username }, jwt_secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {sameSite: 'none', secure: true}).status(201).json({
                id: createdUser._id,
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(409).json("Username or Email already in use");
    }
});