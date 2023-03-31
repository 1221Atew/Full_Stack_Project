// logic to deal with request and response here
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

import User from "../models/Users";
import UserServices from "../services/users"

export const createUserCotroller = async (request: Request, response: Response) =>{
    try {
        const {password} = request.body;
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        
        const newUser = new User({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            age: request.body.age,
            postCode:request.body.postCode,
            address: request.body.address,
            email: request.body.email,
            password: hashedPassword
        })

        const user = await UserServices.createUser(newUser)
        response.json(user)
    }
    catch(error){
        console.log(error);
    }
}
export const getUserCotroller = async (request: Request, response: Response) =>{
    try {
        const user = await UserServices.getUserById(request.params.userId)
        response.json(user)
    }
    catch(error){
        console.log(error);
    }
}

export const updateUserCotroller = async (request: Request, response: Response) =>{
    try {
        const {postCode, address, password} = request.body;
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,saltRounds)

        const updateUser = {password: hashedPassword, postCode: postCode, address: address}

        const user = await UserServices.updateUser(request.params.userId, updateUser);
        response.json(user)
    }
    catch(error){
        console.log(error);
    }
}
export const deleteUserCotroller = async (request: Request, response: Response) =>{
    try {
        const user = await UserServices.deleteUser(request.params.userId);
        response.json(user)
    }
    catch(error){
        console.log(error);
    }
}

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const logInWithPassword = async (request: Request, response: Response) =>{
    try {
        const userDetailData = await UserServices.findUserByEmail(request.body.email)
        if (!userDetailData){
            response.json({message: `incorrect email or wrong password`})
            return;
        }
        
        const passwordDatabase = userDetailData.password;
        const plainPassword = request.body.password;
        const match = await bcrypt.compare(plainPassword, passwordDatabase);

        if (!match){
            response.json({message: `incorrect email or wrong password`})
            return;
        }
        const token = jwt.sign(
            {email: userDetailData.email},
            JWT_SECRET, 
            {expiresIn: "1h"}
        );

        const userData = {
            _id: userDetailData._id,
        }
        response.json({ userData, token});
    }
    catch(error){
        console.log(error);
    }
}