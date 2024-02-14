import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//import user schema
import User from '../models/user.js';


export const router = express.Router();

const jwt_secret = process.env.JWT_SECRET;


router.get('/test', (req, res) => {
    return res.sendStatus(200);
});

router.get('/profile', (req, res)=>{
    const {token} = req.cookies;
    jwt.verify(token, jwt_secret, {}, (err, userData)=>{
        if(err) throw err;
        const {id, username} = userData;

        res.json({
            id, username
        })
    })
})

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const createdUser = await User.create({ username, email, password });
        jwt.sign({ userId: createdUser._id }, jwt_secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json({
                id: createdUser._id,
                username,
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(409).json("Username or Email already in use");
    }
});