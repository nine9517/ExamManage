//Require
const express = require('express');
const router = express.Router();

//Controller
const subjectController = require('../controllers/subjectController');

//Router
router.route('/').get(subjectController.index);
router.route('/add').post(subjectController.add);
router.route('/edit/:id').get(subjectController.viewDatail);
router.route('/del/:id').get(subjectController.delete);
router.route('/update').post(subjectController.update);
router.route('/search/:key').get(subjectController.search);

//Exports
module.exports = router;