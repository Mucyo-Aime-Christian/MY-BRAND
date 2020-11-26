import jwt from "jsonwebtoken";
//import {config} from "../set-up/env";

//*****************************
import { config } from "dotenv";
config();
//export const JWT_KEY = process.env.JWT_KEY
//

export const signToken = (data) => {
    const JWTKEY = process.env.JWT_KEY;
    //const JWTKEY = config.JWT_KEY;
    const { email, _id, role } = data;
    try {
        const token= jwt.sign(
             { email, _id,role},
           JWTKEY,
            { expiresIn: '1d' }
        );
        return token;
    }
    catch (error) {
        console.log(error)
        throw new Error('No token');
    }
};