//Require
const express = require('express');
const router = express.Router();

//Controller
const buildingController = require('../controllers/buildingController');

//Router
router.route('/').get(buildingController.index);
router.route('/add').post(buildingController.addBuilding);
router.route('/addone').post(buildingController.add);
router.route('/managebuilding').get(buildingController.viewBuilding);
router.route('/managebuilding/del/:id').get(buildingController.delete);
router.route('/managebuilding/edit/:id').get(buildingController.edit);
router.route('/managebuilding/update').post(buildingController.update);

//Exports
module.exports = router;