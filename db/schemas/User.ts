import { Model, model, Schema } from "mongoose";

export interface Users {
    name:string,
}

const usersSchema:Schema<Users> = new Schema({
    name: {
        type:String,
        required:true,
    },
},{
    collection:'Messages'
});

export const users:Model<Users> = model('Users',usersSchema)