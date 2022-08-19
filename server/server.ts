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

mongoose.connect("mongodb+srv://De2Viator:Sadf2005@cluster0.mxly6ky.mongodb.net/Messenger")
const app = express();
const PORT = process.env.PORT || 3030
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

/*app.use(cors({
    origin:'http://localhost:3030/',
    optionsSuccessStatus:200
}))*/

app.use(helmet())

app.use('/chats',routerChat)
app.use('/messages', routerMessages);
app.get('/test',(req,res) => {
    res.status(200).send('Work')
})


app.listen(PORT, () => {
  console.log(`Application listen http://localhost:${PORT}/`);
});