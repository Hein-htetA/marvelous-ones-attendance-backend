const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be provided']
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
    address: {
        type: String,
    },
    createdByApp: {
        type: Boolean,
        default: true
    },
    nrc: {
        type: String,
        lowercase: true,
        match: [
            /^\d{1,2}\/\w{3}/,
            'nrc format is not valid'
        ],
        required: [true, 'NRC number must be provided']
    },
    age: {
        type: Number,
    },
    attendance: {
        type: [[Boolean]],
        default: [
            Array(6).fill(false)
        ]
    }
}, { timestamps: true })

module.exports = mongoose.model('Students', studentSchema);