import { Model, model, Schema } from "mongoose";
import { Chat as ChatType } from '../../shared/models/chat';

const ChatSchema:Schema<ChatType> = new Schema({
    lastMessage: {
        type: String,
        required: true,
    },
    messageDate: {
        type: String,
        required: true,
    },
    type: {
        type:String,
        required: true,
    },
    partner: {
        name: String,
        photo: {
            contentType: String,
            data: String,
        },
        userId: String,
    },
    user: {
        name: String,
        photo: {
            contentType: String,
            data: String,
        },
        userId: String,
    },
},{
    collection:'Chats',
});

export const Chat:Model<ChatType> = model('Chat',ChatSchema)