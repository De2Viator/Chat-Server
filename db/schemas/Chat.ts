import { Model, model, Schema } from "mongoose";

export interface Chat {
    name:string,
}

const ChatSchema:Schema<Chat> = new Schema({
    name: {
        type:String,
        required:true,
    }
},{
    collection:'Chats'
});

export const Chat:Model<Chat> = model('Chat',ChatSchema)