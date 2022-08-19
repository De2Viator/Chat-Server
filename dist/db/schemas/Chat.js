"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    collection: 'Chats'
});
exports.Chat = (0, mongoose_1.model)('Chat', ChatSchema);
