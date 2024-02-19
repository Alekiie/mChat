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

router.get('/profile', (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, jwt_secret, {}, (err, userData) => {
            if (err) throw err;

            res.status(200).json(userData);
        })
    } else {
        res.status(401).json(`no token`)
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await  User.findOne({ username });
    // console.log(user);
   try {
       if (user) {
           const passOk = bcrypt.compareSync(password, user.password);
           if (passOk) {
               //create a json web token and send it to the client
               jwt.sign({ userId: user._id, username }, jwt_secret, {}, (err, token) => {
                   if (err) throw err;

                   //set cookie in client's browser
                   res.cookie('token', token).json({ id: user._id, username: user.username });
               });
           }
       }
   } catch (error) {
    console.error(error);
   }
})

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hash = await bcrypt.hashSync(password, salt);

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
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: createdUser._id,
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(409).json("Username or Email already in use");
    }
});