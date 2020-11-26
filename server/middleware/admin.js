import { verify } from "jsonwebtoken";
import config from "../set-up/env"
import {JWT_KEY} from "../set-up/env"
//const JWTKEY = config.JWT_KEY;

import jwt from "jsonwebtoken";
import env from "../set-up/env";
import {Response} from "../helpers/response";

export class loggeduserandadmin{
static  loggedUser (req, res, next)  {
    const header = req.header('auth-token');
    
    if (!header) return Response.error(res, 401, "Access denied. no token provided ");
    
    try {
        const decode = verify(header, JWTKEY);
        req.user = decode;
        
        return next();
    } catch (error) {
        return Response.error(res, 401, "Invalid token.");
    }
}

static  checkAdmin (req, res, next)  {
    const token = req.header("Authorization");
    console.log(token)
    if (!token)
      return Response.error(res, 401, "Access denied. no token provided ");
    try {
      const decode = jwt.verify(token, JWT_KEY);
      console.log(decode)
      req.user = decode;
     return next();
    } catch (error) {
      console.log(error)
      return Response.error(res, 401, "Invalid token.");
    }
}
}