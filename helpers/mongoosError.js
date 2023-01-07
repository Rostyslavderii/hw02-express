const handleMongooseError = (error, _, next) => {
    const { name, code } = error;
    error.status = name === 'MongooseError' && code === 11000 ? 409 : 400;
    next();
};

module.exports = handleMongooseError