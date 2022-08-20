"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const winston_1 = __importDefault(require("winston"));
const helmet_1 = __importDefault(require("helmet"));
const chat_1 = require("./routes/chat");
const message_1 = require("./routes/message");
require("dotenv/config");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
mongoose_1.default.connect(process.env.MONGO);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3030;
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.simple(),
    transports: [
        new winston_1.default.transports.File({
            level: 'info',
            filename: 'logs/requests.log'
        })
    ]
});
app.use((req, res, next) => {
    logger.log('info', `${req.method} ${req.url}`);
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
/*app.use(cors({
    origin:'http://localhost:3030/',
    optionsSuccessStatus:200
}))*/
app.use((0, helmet_1.default)());
app.use('/chats', chat_1.routerChat);
app.use('/messages', message_1.routerMessages);
app.get('/test', (req, res) => {
    res.status(200).send('Work');
});
app.listen(PORT, () => {
    console.log(`Application listen http://localhost:${PORT}/`);
});
