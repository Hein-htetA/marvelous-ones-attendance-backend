const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be provided']
    },
    batch: {
        type: Number,
        required: [true, 'Batch number must be provided'],
    },
    father: {
        type: String,
    },
    mother: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    address: {
        type: String,
    },
    contactNo: {
        type: String,
    },
    education: {
        type: String
    },
    nrc: {
        type: String,
        lowercase: true,
    },
    occupation: {
        type: String
    },
    jobDepartment: {
        type: String
    },
    level: {
        type: String,
        enum: {
            values: ['elementary', 'intermediate', 'advanced'],
            message: '{VALUE} is not provided'
        },
        lowercase: true,
        default: 'intermediate'
    },
    createdByApp: {
        type: Boolean,
        default: true
    },
    attendance: {
        type: [[Boolean]],
        default: [
            Array(6).fill(true)
        ]
    }
}, { timestamps: true })

module.exports = mongoose.model('Students', studentSchema);