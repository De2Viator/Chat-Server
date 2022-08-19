"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,
        required: true,
    }
}, {
    collection: 'Messages'
});
exports.Message = (0, mongoose_1.model)('Message', MessageSchema);
