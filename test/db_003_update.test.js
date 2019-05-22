
const assert = require('assert');
const chalk = require('chalk');
const faker = require('faker/locale/en');

const Term = require('../models/term');

const Building = require('../models/building');

const Room = require('../models/room');

const Login = require('../models/login');

const Teacher = require('../models/teacher');;

const Student = require('../models/student');

const Course = require('../models/course');

const Subject = require('../models/subject');

const Examination = require('../models/examination');


Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

Number.ran = function(min,max) {
    return  Math.floor(Math.random() * (max - min) + min);
}

describe('Update details!', () => {
    

    after(()=> { 
        console.log('  End Update details!'); 
    });

    
    afterEach((done) => {
        console.log(chalk.white("       |---> value "+global.value+" => "+global.valueNew));
        done();
      });
  
    it('Update Term with term No.', (done) => {
        global.value = global.term.termNo
        Term.findOne({ termNo: global.term.termNo })
            .then(async(res) => {

                res.termNo = Number.ran(1,3);
                await res.save();
                global.valueNew = res.termNo
                
                done();
            });
    })

    it('Update Building with Building Name', (done) => {
        global.value = global.building.building_name
        Building.findOne({ building_name: global.building.building_name })
            .then(async(res) => {
                res.building_name = faker.address.countryCode();
                await res.save();
                global.valueNew = res.building_name
                global.building = res
                done();
            });
    })

    it('Update Room with Name', (done) => {
        global.value = global.room.name
        Room.findOne({ name: global.room.name })
            .then(async(res) => {
                res.name =  global.building.building_name+"-"+Number.ran(1,100).pad(3);
                await res.save();
                global.valueNew = res.name
                done();
            });
    })

    it('Update Login with E-mail', (done) => {
        global.value = global.login.email
        Login.findOne({ email: global.login.email })
            .then(async(res) => {
                res.email = faker.internet.email();
                await res.save();
                global.valueNew = res.email 
                done();
            });
    })

    it('Update Teacher with E-mail', (done) => {
        global.value = global.teacher.email
        Teacher.findOne({ email: global.teacher.email })
            .then(async(res) => {
                res.email = faker.internet.email();
                await res.save();
                global.valueNew = res.email 
                done();
            });
    })

    it('Update Student with E-mail', (done) => {
        global.value = global.student.email
        Student.findOne({ email: global.student.email })
            .then(async(res) => {
                res.email = faker.internet.email();
                await res.save();
                global.valueNew = res.email 
                done();
            });
    })

    it('Update Course with Course No.', (done) => {
        global.value = global.course.courseNo
        Course.findOne({ courseNo: global.course.courseNo })
            .then(async(res) => {
                res.courseNo = Number.ran(100,999);
                await res.save();
                global.valueNew = res.courseNo 
                done();
            });
    })

    it('Update Subject with Subject ID', (done) => {
        global.value = global.subject.subjectKey
        Subject.findOne({ subjectKey: global.subject.subjectKey })
            .then(async(res) => {
                res.subjectKey = "8859"+Number.ran(1,999).pad(3);
                await res.save();
                global.valueNew = res.subjectKey;
                done();
            });
    })

    it('Update Examination with Status', (done) => {
        global.value = global.examination.status
        Examination.findById(global.examination._id,async(err,res)=>{
            res.status = false;
            await res.save();
            global.valueNew = res.status 
            done();
        })
            
    })
})

