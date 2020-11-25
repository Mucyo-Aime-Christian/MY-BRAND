const { verify } = require ('jsonwebtoken');
const config =require ('../set-up/env');

const JWTKEY = config.JWT_KEY;
const jwt = require("jsonwebtoken");
const env = require("../set-up/env");
const Response = require("../helpers/response");


class loggeduserandadmin{
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
      const decode = jwt.verify(token, env.JWT_KEY);
      console.log(decode)
      req.user = decode;
     return next();
    } catch (error) {
      return Response.error(res, 401, "Invalid token.");
    }
}
}
module.exports = loggeduserandadmin;