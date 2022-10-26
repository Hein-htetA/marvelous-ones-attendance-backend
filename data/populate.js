require('dotenv').config();

const Student = require('../models/studentSchema');
const mongoose = require('mongoose');

const temp = require('./students.json');
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Student.insertMany(temp);
        console.log('Success!!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
start();