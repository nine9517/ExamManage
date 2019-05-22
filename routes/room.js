//Require
const express = require('express');
const router = express.Router();

//Controller
const roomController = require('../controllers/roomController');

//Router
router.route('/').get(roomController.index);
router.route('/add').post(roomController.add);
router.route('/manageroom').get(roomController.viewRoom);
router.route('/manageroom/edit/:id').get(roomController.viewDatailRoom);
router.route('/manageroom/del/:id').get(roomController.delete);
router.route('/manageroom/update').post(roomController.update);
//Exports
module.exports = router;