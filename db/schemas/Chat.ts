import { Model, model, Schema } from "mongoose";

export interface Chat {
    userId: string;
    partnerId: string;
    lastMessage: string;
    messageDate: string;
}

const ChatSchema:Schema<Chat> = new Schema({
    userId: {
        type:String,
        required:true,
    },
    partnerId: {
        type:String,
        required:true,
    },
    lastMessage: {
        type: String,
        required: true,
    },
    messageDate: {
        type: String,
        required: true,
    }
},{
    collection:'Chats',
});

export const Chat:Model<Chat> = model('Chat',ChatSchema)