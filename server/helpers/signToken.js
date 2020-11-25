const config = require('../set-up/env')
 const jwt = require('jsonwebtoken');
 
const signToken = (data) => {
    const JWTKEY = config.JWT_KEY;
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
module.exports = signToken;