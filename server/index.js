import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import router from './routes/routes.js';

dotenv.config();

const port = process.env.PORT || 5050;

const app = express();
const server = http.createServer(app);

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', router);
app.use(cors());
app.use(morgan('combined'));




server.listen(port, console.log(`Server is running on port ${port}`));