const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];
    console.log(req.headers);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.log(error)
        throw new UnauthenticatedError("Invalid Authentication");
    }
}

module.exports = auth