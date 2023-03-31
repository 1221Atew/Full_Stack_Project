// jwt passport here
import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt"
import { response } from "express";
import dotenv from "dotenv"

import UserServices from "../services/users"

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

 export const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, 
    async(payload, done)=>{
        const userEmail = payload.email;
        const foundUser = await UserServices.findUserByEmail(userEmail);
        if(!foundUser) {
            response.json("no user found");
            return;
        }
        done(null, foundUser)
    }
)