
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { asyncWrapper, HttpError } = require('../helpers');

const { User } = require("../models/user");
const { JWT_SECRET } = process.env;


const registrationController = async (req, res) => {
    const {
        email,
        password
    } = req.body

   const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
    })
}


const loginController = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET,{expiresIn: "16h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        email: user.email, 
        subscription: user.subscription,
    })
}

const getCurrentUser = async (req, res) => {
    const { subscription, email } = req.user;

    res.json({email, subscription})
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.json({
        status: 'success'
    })

}
module.exports = {
    singup: asyncWrapper(registrationController),
    login: asyncWrapper(loginController), 
    logout: asyncWrapper(logout),
    getCurrentUser: asyncWrapper(getCurrentUser)
    
}