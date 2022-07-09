import * as jwt from 'jsonwebtoken'
import { NextFunction, Request,  Response } from "express";

interface JwtPayload{
    id: string
}

export const verifyToken = (request:Request, response:Response, next:NextFunction)=>{
    try{
        const authHeader = request.headers.authorization;
        const jwtToken = authHeader?.split(' ')[1]

        if(!jwtToken){
            return response.status(403).json("Not authorized")
        }
        const payload = jwt.verify(jwtToken, process.env.SECRET_KEY as string) as JwtPayload
        request.id = payload.id

    } catch(err){
        return response.status(403).json("Not Authorized");
    }
    next();
}
