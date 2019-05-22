//Require
const express = require('express');
const router = express.Router();

//Controller
const examController = require('../controllers/examController');

//Router
router.route('/').get(examController.index);
router.route('/viewExam').get(examController.viewExam);
router.route('/manage/course/:id').get(examController.manageCourse);
router.route('/view/course/:id').get(examController.viewExamCourse);
router.route('/manage/course/del/:sub/:id/:exam').get(examController.delExam);
router.route('/view/course/del/:sub/:id/:exam').get(examController.delExamView);
router.route('/manage/course/announce/:sub/:id/:exam').get(examController.announceExam);
router.route('/search/room').post(examController.searchRoom);
router.route('/search/:key').get(examController.search);
router.route('/manage/room/:sub/:id/:exam').get(examController.manageRoom);
router.route('/manage/examiner/:sub/:id/:exam').get(examController.manageExaminer);
router.route('/manage/room/save/:sub/:id').post(examController.saveRoom);
router.route('/manage/examiner/save/:sub/:id').post(examController.saveExaminer);
router.route('/manage/course/:sub/:id').get(examController.manageCourseDetail);
router.route('/view/course/:sub/:id').get(examController.viewExamCourseDetail);
router.route('/manage/course/addExam/:sub/:id').get(examController.addExam);
router.route('/search/examiner').post(examController.searchExaminer);
//Exports
module.exports = router;