import { Auth } from "../../db/schemas/Auth";
import { User } from "../../db/schemas/User";
import jwt from 'jsonwebtoken';
import express from "express";
import crypto from 'crypto';
import { Request, Response } from "express";
import passport from "passport";
import {Strategy } from 'passport-google-oauth2';
const GoogleStrategy = Strategy
export const routerAuth = express.Router();

passport.use(new GoogleStrategy({
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
    passReqToCallback   : true
}, function(_request: any, _accessToken: any, _refreshToken: any, _profile: any, done: () => void) {
    done();
}))

routerAuth
.post('/sign',async (req:Request, res:Response) => {
    const findedUser = !!await User.findOne({
        name:req.body.name
    })
    if(!findedUser) {
        const password = crypto.createHmac("sha512","secret").update(req.body.password).digest("hex");
        const user = await User.create({
            name:req.body.name,
            password,
        })
        const accessToken = jwt.sign({name:req.body.name}, process.env.JWT_SECRET as string, {expiresIn:'120s'});
        const refreshToken = jwt.sign({name:req.session.id}, process.env.JWT_SECRET as string, {expiresIn:'600s'});
        await Auth.create({
            refreshToken,
            accessToken
        })
        res.cookie('accessToken',accessToken);
        res.send(user)
    } else {
        res.status(401).send('This user was registered')
    }
})
.post('/log',async (req: Request,res: Response) => {
    const password = crypto.createHmac("sha512","secret").update(req.body.password).digest("hex");
    const user = await User.findOne({
        name:req.body.name,
        password,
    })
    if(!!user) {
        const responseUser = JSON.parse(JSON.stringify(user));
        delete responseUser.password;
        const accessToken = jwt.sign({name:req.body.name}, process.env.JWT_SECRET as string, {expiresIn:'1d'});
        const refreshToken = jwt.sign({name:req.body.name}, process.env.JWT_SECRET as string, {expiresIn:'10d'});
        await Auth.create({
            accessToken,
            refreshToken,
        })
        res.cookie('accessToken',accessToken);
        res.send(responseUser)
    } else {
        res.status(401).send('Email or password don\'t correct')
    }
})
.get('/google',() => {
    console.log('google')
    try {
        passport.authenticate("google",{scope:['profile','email']})
    } catch(e) {
        console.log(e)
    }
})
.get('/google/callback', (_req,_res) => {
    passport.authenticate('google',{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:'/google/failed'
    })
})
.get('/google/failed', (_req,res)=> {
    res.send('Auth faile')
})

export const authMiddleware = async (req:Request,res:Response, next:any) => {
    try {
        jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET as string);
        next();
    } catch(e) {
        const auth = await Auth.findOne({accessToken:req.cookies.accessToken});
        try {
            jwt.verify(auth?.refreshToken as string, process.env.JWT_SECRET as string);
            const accessToken = jwt.sign({name:req.body.name}, process.env.JWT_SECRET as string, {expiresIn:'1m'});
            await Auth.create({
                accessToken,
                refreshToken:auth?.refreshToken,
            })
            req.cookies.accessToken = accessToken;
            next();
        } catch(e) {
            res.send('Relogin')
        }
    }
}