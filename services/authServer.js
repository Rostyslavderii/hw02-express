const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const registration = async(email, password )=> {
    const user = new User({
        email, password
    });
    await user.save();
    
    return user;
}

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(`No user found for ${email}`);
    }

    if (await bcrypt.compare(password,user.password)) {
        throw HttpError('Invalid password');
        
    }

    const token = jwt.sign({
        _id: user._id,
        createdAt: user.createdAt
    }, process.env.JWT_SECRET);

return token;
}