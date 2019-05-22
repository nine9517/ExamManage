
const assert = require('assert');
const chalk = require('chalk');

const Term = require('../models/term');

const Building = require('../models/building');

const Room = require('../models/room');

const Login = require('../models/login');

const Teacher = require('../models/teacher');;

const Student = require('../models/student');

const Course = require('../models/course');

const Subject = require('../models/subject');

const Examination = require('../models/examination');


describe('Reading details!', () => {
    

    after(()=> { 
        console.log('  End Reading details!'); 
    });

    
    afterEach((done) => {
        console.log(chalk.white("       |---> value = "+global.value));
        done();
      });
  
    it('finds Term with term No.', (done) => {
        global.value = global.term.termNo
        Term.findOne({ termNo: global.term.termNo })
            .then((res) => {
                assert(res.termNo === global.term.termNo); 
                done();
            });
    })

    it('finds Building with Building Name', (done) => {
        global.value = global.building.building_name
        Building.findOne({ building_name: global.building.building_name })
            .then((res) => {
                assert(res.building_name === global.building.building_name); 
                done();
            });
    })

    it('finds Room with Name', (done) => {
        global.value = global.room.name
        Room.findOne({ name: global.room.name })
            .then((res) => {
                assert(res.name === global.room.name); 
                done();
            });
    })

    it('finds Login with E-mail', (done) => {
        global.value = global.login.email
        Login.findOne({ email: global.login.email })
            .then((res) => {
                assert(res.email === global.login.email); 
                done();
            });
    })

    it('finds Teacher with E-mail', (done) => {
        global.value = global.teacher.email
        Teacher.findOne({ email: global.teacher.email })
            .then((res) => {
                assert(res.email === global.teacher.email); 
                done();
            });
    })

    it('finds Student with E-mail', (done) => {
        global.value = global.student.email
        Student.findOne({ email: global.student.email })
            .then((res) => {
                assert(res.email === global.student.email); 
                done();
            });
    })

    it('finds Course with Course No.', (done) => {
        global.value = global.course.courseNo
        Course.findOne({ courseNo: global.course.courseNo })
            .then((res) => {
                assert(res.courseNo === global.course.courseNo); 
                done();
            });
    })

    it('finds Subject with Subject ID', (done) => {
        global.value = global.subject.subjectKey
        Subject.findOne({ subjectKey: global.subject.subjectKey })
            .then((res) => {
                assert(res.subjectKey === global.subject.subjectKey); 
                done();
            });
    })

    it('finds Examination with _id', (done) => {
        global.value = global.examination._id
        Examination.findById(global.examination._id,(err,res)=>{
           
            
            assert(res._id.toString() === global.examination._id.toString()); 
            done();
        })
            
    })
})

