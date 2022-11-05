const express = require('express');
const { 
    getByBatch,
    attendanceUpdate,
    addNewStudent
} = require('../controllers/students');

const router = express.Router();

router.route('/').get(getByBatch).patch(attendanceUpdate).post(addNewStudent);


module.exports = router;