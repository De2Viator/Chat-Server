import { Model, model, Schema } from "mongoose";

export interface Message {
    name:string,
    message:string,
    chatId:string,
    userId:string,
    messageId:string,
}

const MessageSchema:Schema<Message> = new Schema({
    name: {
        type:String,
        required:true,
    },
    message: {
        type:String,
        required:true,
    },
    chatId: {
        type:String,
        required:true,
    },
    userId:{
        type: String,
        required:true
    }
},{
    collection:'Messages'
});

export const Message:Model<Message> = model('Message',MessageSchema)