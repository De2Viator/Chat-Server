import { Auth } from "../../db/schemas/Auth";
import { User } from "../../db/schemas/User";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import express from "express";
import crypto from 'crypto';
import multer from 'multer';
import { Request, Response } from "express";
export const routerAuth = express.Router();
const imageStorage = multer.diskStorage({
    destination:'uploads',
    filename(req,file,cb) {
        cb(null,file.originalname)
    }
})
const uploadImage = multer({
    storage:imageStorage,
}).single('photo')


routerAuth
.post('/signUp', uploadImage, async (req, res:Response) => {
    const findedUser = !!await User.findOne({
        email:req.body.email
    })
    if(!findedUser) {
        const password = crypto.createHmac("sha512","secret").update(req.body.password).digest("hex")
        const hobbies = eval(req.body.hobbies);
        const user = await User.create({
            email:req.body.email,
            password,
            nick:req.body.nick,
            description:req.body.description,
            birthdayDate:new Date(req.body.birthdayDate).toISOString(),
            hobbies,
            name:req.body.name,
            surname:req.body.surname,
            photo:{
                data:req.file?.filename,
                contentType:req.file?.mimetype,
            }
        })
        const accessToken = jwt.sign({email:req.body.email}, process.env.JWT_SECRET as string, {expiresIn:'1d'});
        const refreshToken = jwt.sign({email:req.session.id}, process.env.JWT_SECRET as string, {expiresIn:'365d'});
        await Auth.create({
            refreshToken,
            accessToken
        })
        res.cookie('accessToken',accessToken);
        const responseUser = JSON.parse(JSON.stringify(user));
        delete responseUser.password;
        responseUser.photo.data= fs.readFileSync(`D:/Node/uploads/${responseUser.photo.data}`,'base64'); 
        res.send(responseUser)
    } else {
        res.status(401).send('This user was registered')
    }
})
.post('/signIn',async (req: Request,res: Response) => {
    const password = crypto.createHmac("sha512","secret").update(req.body.password).digest("hex");
    const user = await User.findOne({
        email:req.body.email,
        password,
    })
    if(!!user) {
        const responseUser = JSON.parse(JSON.stringify(user));
        delete responseUser.password;
        const accessToken = jwt.sign({email:req.body.email}, process.env.JWT_SECRET as string, {expiresIn:'1d'});
        const refreshToken = jwt.sign({email:req.body.email}, process.env.JWT_SECRET as string, {expiresIn:'10d'});
        await Auth.create({
            accessToken,
            refreshToken,
        })
        res.cookie('accessToken',accessToken);
        responseUser.photo.data= fs.readFileSync(`D:/Node/uploads/${responseUser.photo.data}`,'base64'); 
        res.send(responseUser)
    } else {
        res.status(401).send('Email or password don\'t correct')
    }
})

export const authMiddleware = async (req:Request,res:Response, next:any) => {
    try {
        jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET as string);
        next();
    } catch(e) {
        const auth = await Auth.findOne({accessToken:req.cookies.accessToken});
        try {
            jwt.verify(auth?.refreshToken as string, process.env.JWT_SECRET as string);
            const accessToken = jwt.sign({email:req.body.email}, process.env.JWT_SECRET as string, {expiresIn:'1m'});
            await Auth.create({
                accessToken,
                refreshToken:auth?.refreshToken,
            })
            req.cookies.accessToken = accessToken;
            next();
        } catch(e) {
            res.status(401).send('Relogin')
        }
    }
}