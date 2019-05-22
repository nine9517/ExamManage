
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

describe('Deleting details!', () => {

    after(()=> { 
        console.log('  End Deleting details!'); 
    });

    
    afterEach((done) => {
        console.log(chalk.white("       |---> _id =>  "+global.value));
        done();
      });
  
    it('Deleting Term', (done) => {
             
        global.value = global.term._id
        Term.findById(global.term._id,async(err,res)=>{
            await res.remove();
            done();
        })
    })

    it('Deleting Building', (done) => {
        global.value = global.building._id
        Building.findById(global.building._id,async(err,res)=>{
            await res.remove();
            done();
        })
    })

    it('Deleting Room', (done) => {
        global.value = global.room._id
        Room.findById(global.room._id,async(err,res)=>{
            await res.remove();
            done();
        })
    })

    it('Deleting Login', (done) => {
        global.value = global.login._id
        Login.findById(global.login._id,async(err,res)=>{
            await res.remove();
            done();
        })
        
    })

    it('Deleting Teacher', (done) => {
        global.value = global.teacher._id
        Teacher.findById(global.teacher._id,async(err,res)=>{
            await res.remove();
            done();
        })
    })

    it('Deleting Student', (done) => {
        global.value = global.student._id
        Student.findById(global.student._id,async(err,res)=>{
            await res.remove();
            done();
        })
    })

    it('Deleting Course', (done) => {
        global.value = global.course._id
        Course.findById(global.course._id,async(err,res)=>{
            await res.remove();
            done();
        })
    })

    it('Deleting Subject', (done) => {
        global.value = global.subject._id
        Subject.findById(global.subject._id,async(err,res)=>{
            await res.remove();
            done();
        })
    })

    it('Deleting Examination', (done) => {
        global.value = global.examination._id
        Examination.findById(global.examination._id,async(err,res)=>{
            await res.remove();
            done();
        })            
    })
})

