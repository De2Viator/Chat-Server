import express from 'express';
import mongoose from 'mongoose';
import winston from 'winston';
import cors from 'cors';
import helmet from 'helmet';
import { routerChat } from './routes/chat';
import { routerMessages } from './routes/message';
import { routerAuth } from './routes/auth';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import http from 'http';
import { Auth } from '../db/schemas/Auth';
import session from 'express-session';
import passport from 'passport';
import { Server } from "socket.io"; 

config();

mongoose.connect(process.env.MONGO as string)
const app = express();
const server = http.createServer(app);
const socket = new Server(server);
const PORT = process.env.PORT
const logger = winston.createLogger({
    format:winston.format.simple(),
    transports:[
        new winston.transports.File({
            level:'info',
            filename:'logs/requests.log'
        })
    ]
})

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    cookie:{
        httpOnly:true,
    },
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use(cors({
    origin:`http://localhost:${PORT}`,
    methods:"GET,POST,PUT,DELETE",
    optionsSuccessStatus:200
}))

app.use(helmet())


app.use((req,res,next) => {
    logger.log('info',`${req.method} ${req.url}`);
    next();
})

app.use('/auth', routerAuth);

app.use(async (req,res,next) => {
    try {
        jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET as string);
        next();
    } catch(e) {
        const auth = await Auth.findOne({accessToken:req.cookies.accessToken});
        try {
            jwt.verify(auth?.refreshToken as string, process.env.JWT_SECRET as string);
            const accessToken = jwt.sign({name:req.body.name}, process.env.JWT_SECRET as string, {expiresIn:'1m'});
            await Auth.create({
                accessToken,
                refreshToken:auth?.refreshToken,
            })
            req.cookies.accessToken = accessToken;
            next();
        } catch(e) {
            res.send('Relogin')
        }
    }
})

app.use('/chats', routerChat)
app.use('/messages', routerMessages);
app.get('/test',(req,res) => {
    res.status(200).send('Work')
})

socket.on('connection',(socket) => {
    console.log('connected')
})
server.listen(PORT, () => {
  console.log(`Application listen http://localhost:${PORT}/`);
});