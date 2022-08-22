import express, { Application } from 'express';
import mongoose from 'mongoose';
import winston, { Logger } from 'winston';
import cors from 'cors';
import helmet from 'helmet';
import { routerChat } from './routes/chat';
import { routerMessages } from './routes/message';
import { authMiddleware, routerAuth } from './routes/auth';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import http from 'http';
import session from 'express-session';
import passport from 'passport';
import { Server, Socket } from "socket.io"; 
import { Message } from '../db/schemas/Message';

config();

mongoose.connect(process.env.MONGO as string)
const app: Application = express();
const server = http.createServer(app);
const io: Server = new Server(server);
const PORT:string = process.env.PORT as string
const logger:Logger = winston.createLogger({
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
    methods:"GET, POST, PUT, DELETE"
}))

app.use(helmet())


app.use((req,res,next) => {
    logger.log('info',`${req.method} ${req.url}`);
    next();
})

app.use('/auth', routerAuth);

app.use(authMiddleware)

app.use('/chats', routerChat)
app.use('/messages', routerMessages);
app.get('/test',(req,res) => {
    res.status(200).send('Work')
})

io.on('connection', async (socket: Socket) => {
    socket.on('send-message', async (message: Message) => {
        await Message.create({
            message:message.message,
            name:message.name,
            chatId:message.chatId,
            userId:message.userId,
        });
        const chat = await Message.find({chatId:message.chatId});
        socket.emit('get-message',chat)
    });
    socket.on('update-message', async(message:Message) => {
        console.log(message)
        await Message.findByIdAndUpdate(message.messageId, {
            message:message.message
        });
        const chat = await Message.find({chatId:message.chatId});
        socket.emit('get-message',chat)
    });
    socket.on('delete-message',async (message:Message) => {
        await Message.findByIdAndDelete(message.messageId);
        const chat = await Message.find({chatId:message.chatId});
        socket.emit('get-message',chat)
    });
})

server.listen(PORT, () => {
  console.log(`Application listen http://localhost:${PORT}/`);
});