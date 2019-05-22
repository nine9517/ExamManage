//Require
const express = require('express');
const router = express.Router();

const middleWare = require('../middleware/auth');


//Controller
const loginController = require('../controllers/loginController');

//Router
router.route('/').get(middleWare.notLogin, loginController.index);
router.route('/check').post(loginController.check);
router.route('/adduser').post(loginController.addUser);
router.route('/login').post(loginController.login);
router.route('/logout').get(loginController.logOut);

//Exports
module.exports = router;