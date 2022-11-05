const { BadRequestError, UnauthenticatedError } = require('../errors');
const Student = require('../models/studentSchema');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { password } = req.body;
    if (!password) {
        throw new BadRequestError('Please provide password');
    }

    if (password !== process.env.LOGIN_PASSWORD) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = jwt.sign(
        {a: "hi"}, 
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    )

    res.status(200).json({ msg: 'login success', token })

}

module.exports = {
    login
}