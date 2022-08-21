import { Model, model, Schema } from "mongoose";

export interface Auth {
    refreshToken: string,
    accessToken: string
}

const AuthSchema:Schema<Auth> = new Schema({
    refreshToken:{
        type: String,
        required: true,
    },
    accessToken: {
        type:String,
        required: true,
    }
},{
    collection:'Auths'
});

export const Auth:Model<Auth> = model('Auth',AuthSchema)