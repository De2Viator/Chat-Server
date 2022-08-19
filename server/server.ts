import express from 'express';
import mongoose from 'mongoose';
import winston from 'winston';
import cors from 'cors';
import helmet from 'helmet';
import { routerChat } from './routes/chat';
import { routerMessages } from './routes/message';
import 'dotenv/config';
import { config } from 'dotenv';
config();

console.log(process.env.MONGO)
mongoose.connect(process.env.MONGO as string)
const app = express();
const logger = winston.createLogger({
    format:winston.format.simple(),
    transports:[
        new winston.transports.File({
            level:'info',
            filename:'logs/requests.log'
        })
    ]
})

app.use((req,res,next) => {
    logger.log('info',`${req.method} ${req.url}`);
    next();
})

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use(cors({
    origin:'http://localhost:3030/',
    optionsSuccessStatus:200
}))

app.use(helmet())

app.use('/chats',routerChat)
app.use('/messages', routerMessages);


app.listen(3030, () => {
  console.log("Application listen http://localhost:3030/");
});