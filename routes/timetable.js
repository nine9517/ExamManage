//Require
const express = require('express');
const router = express.Router();

//Controller
const timetableController = require('../controllers/timetableController');

//Router
router.route('/').get(timetableController.index);

//Exports
module.exports = router;