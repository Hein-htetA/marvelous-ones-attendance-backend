const express = require('express');
const { 
    addWeek,
    deleteWeek
} = require('../controllers/course');

const router = express.Router();

router.route('/').patch(addWeek).delete(deleteWeek)

module.exports = router;