//Require
const express = require('express');
const router = express.Router();

//Controller
const Controller = require('../controllers/termController');

//Router
router.route('/').get(Controller.index);
router.route('/add').post(Controller.add);
router.route('/edit/:id').get(Controller.edit);
router.route('/del/:id').get(Controller.delete);
router.route('/update').post(Controller.update);

//Exports
module.exports = router;