import { Model, model, Schema } from "mongoose";

export interface Message {
    message:string,
    partnerId?:string,
    userId:string,
    messageId:string,
    chatId?: string,
    timeStamp:Date
}

const MessageSchema:Schema<Message> = new Schema({
    message: {
        type:String,
        required:true,
    },
    userId:{
        type: String,
        required:true
    },
    chatId: {
        type: String,
        required: false
    },
    timeStamp: {
        type: Date,
        required: true
    }
},{
    collection:'Messages'
});

export const Message:Model<Message> = model('Message',MessageSchema)