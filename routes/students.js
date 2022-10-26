const express = require('express');
const { 
    getByBatch 
} = require('../controllers/students');

const router = express.Router();

router.route('/').get(getByBatch);

module.exports = router;