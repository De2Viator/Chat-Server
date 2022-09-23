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
import { routerUser } from './routes/user';
import { Chat } from '../db/schemas/Chat';
import { User } from '../db/schemas/User';

config();

mongoose.connect(process.env.MONGO as string,)
const app: Application = express();
const server = http.createServer(app);
const io: Server = new Server(server, {
    cors:{
        origin:process.env.ORIGIN
    }
});
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
    origin:process.env.ORIGIN,
    credentials:true,
}))

app.use(helmet())


app.use((req,_,next) => {
    logger.log('info',`${req.method} ${req.url}`);
    next();
})

app.use('/auth', routerAuth);

app.use(authMiddleware)

app.use('/chats', routerChat);
app.use('/messages', routerMessages);
app.use('/users',routerUser);
app.get('/test',(_,res) => {
    res.status(200).send('Work')
})
io.on('connection', async (socket: Socket) => {
    let chatId = '';
    socket.on('send-message', async (message: Message) => {
        let chat;
        if(!message.chatId) {
            const user = await User.findById(message.userId);
            const partner = await User.findById(message.partnerId);
            chat = await Chat.create({
                lastMessage: message.message,
                messageDate: new Date().toISOString(),
                type:'CHAT',
                partner:{
                    photo:partner?.photo,
                    userId: partner?._id,
                    name: partner?.name,
                },
                user: {
                    photo: {
                        data: partner?.photo.data,
                        type: partner?.photo.contentType,
                    },
                    userId: partner?._id,
                    name: user?.name,
                }
            });
        } else {
            chat = await Chat.findByIdAndUpdate(message.chatId, {
                lastMessage: message.message,
                messageDate: new Date().toISOString(),
            })
        }
        const response = await Message.create({
            message:message.message,
            userId:message.userId,
            partnerId: message.partnerId,
            chatId: chat?._id,
            timeStamp: new Date().toISOString(),
        });
        io.emit('get-message', response)
    });
    socket.on('update-message', async(message:Message) => {
        await Message.findByIdAndUpdate(message.messageId, {
            message:message.message
        });
        const chat = await Message.find({chatId:chatId});
        io.emit('get-message',chat)
    });
    socket.on('delete-message',async (message:Message) => {
        await Message.findByIdAndDelete(message.messageId);
        const chat = await Message.find({chatId:chatId});
        io.emit('get-message',chat)
    });
})

server.listen(PORT, () => {
  console.log(`Application listen http://localhost:${PORT}/`);
});