//Require
const express = require('express');
const router = express.Router();

const middleWare = require('../middleware/auth');


//Controller
const loginController = require('../controllers/loginController');

//Router
router.route('/').get(loginController.staff);
router.route('/update').post(loginController.updateStaff);
router.route('/del/:id').get(loginController.delStaff);
router.route('/:id').get(loginController.viewDatailStaff);


//Exports
module.exports = router;