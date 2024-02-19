import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


import { router } from './routes/routes.js';
import './controller/controller.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: process.env.CLIENT_URL, credentials: true})); //Enable CORS for all requests
app.use(cookieParser());
app.use(morgan('combined'));
app.use('/', router);

server.listen(port, console.log(`Server is running on port ${port}`));