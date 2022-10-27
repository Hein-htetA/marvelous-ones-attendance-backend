const express = require('express');
const { 
    getByBatch,
    attendanceUpdate
} = require('../controllers/students');

const router = express.Router();

router.route('/').get(getByBatch).patch(attendanceUpdate);

module.exports = router;