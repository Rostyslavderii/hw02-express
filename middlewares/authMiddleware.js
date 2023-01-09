jwt = require('jsonwebtoken');
const HttpError = require('../helpers');

const { User } = require('../models/user');

const { JWT_SECRET } = process.env;



const authMiddleware = async (req, res, next) => {
    //const {authorization = ""} = req.headers;
    const [bearer, token] = req.header['authorization'].split(' ');
    
    if (!bearer) {
        next(new HttpError(401));
    }

   try {
        const {id} = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if(!user || !user.token) {
            next(HttpError(401))
        }
        req.user = user;
        next()
    } catch (error) {
        next(new HttpError('Invalid token'));
    }
    
    
}

module.exports = {
    authMiddleware,
}
