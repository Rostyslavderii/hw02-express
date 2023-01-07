const validateData = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ 'Error': error });
        }
        next();
    };
};


module.exports = {
    validateData,
};