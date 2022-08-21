import { Model, model, Schema } from "mongoose";

export interface Users {
    name:string,
    password:string,
    googleId:string,
}

const userSchema:Schema<Users> = new Schema({
    name: {
        type:String,
        required:false,
    },
    password: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    }
},{
    collection:'Users'
});

export const User:Model<Users> = model('User',userSchema)