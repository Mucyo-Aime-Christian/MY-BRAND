import { verify } from "jsonwebtoken";
import {JWT_KEY} from "../set-up/env"

import jwt from "jsonwebtoken";
import {Response} from "../helpers/response";

export class loggeduserandadmin{

static  checkAdmin (req, res, next)  {
    const token = req.header("Authorization");
    if (!token)
      return Response.error(res, 401, "Access denied. no token provided ");
    try {
      const decode = jwt.verify(token, JWT_KEY);
      req.user = decode;
     return next();
    } catch (error) {
      return Response.error(res, 401, "Invalid token.");
    }
}
}