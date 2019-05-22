//Require
const express = require('express');
const router = express.Router();

//Controller
const courseController = require('../controllers/courseController');

//Router
router.route('/').get(courseController.index);
router.route('/manage/:id').get(courseController.manage);
router.route('/add/:id').post(courseController.CourseAdd);
router.route('/student/add/:sub/:id').post(courseController.CourseStudentAdd);
router.route('/teacher/add/:sub/:id').post(courseController.CourseTeacherAdd);

router.route('/student/:id').get(courseController.viewStudent);
router.route('/teacher/:id').get(courseController.viewTeacher);

router.route('/student/del/:sub/:id/:token').get(courseController.CourseStudentDel);
router.route('/teacher/del/:sub/:id/:token').get(courseController.CourseTeacherDel);


router.route('/group/del/:id/:sub').get(courseController.CourseGroupDel);

router.route('/search/:key').get(courseController.search);



//Exports
module.exports = router;