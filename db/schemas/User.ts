import { Model, model, Schema } from "mongoose";
import { Users } from "../../shared/models/user";

const userSchema:Schema<Users> = new Schema({
    email: {
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    nick: {
        type: String,
        required: true,
    },
    birthdayDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    photo:{
        data:{
            type:Buffer,
            required:true,
        },
        contentType:{
            type:String,
            required: true,
        }
    }
},{
    collection:'Users'
});

export const User:Model<Users> = model('User',userSchema)