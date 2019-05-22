
const assert = require('assert');
const chalk = require('chalk');
const Term = require('../../models/term');
const TermMockup = require('../../mockup/term');

const Building = require('../../models/building');
const BuildingMockup = require('../../mockup/building');

const Room = require('../../models/room');
const RoomMockup = require('../../mockup/room');

const Login = require('../../models/login');
const LoginMockup = require('../../mockup/login');

const Teacher = require('../../models/teacher');
const TeacherMockup = require('../../mockup/teacher');

const Student = require('../../models/student');
const StudentMockup = require('../../mockup/student');

const Course = require('../../models/course');
const CourseMockup = require('../../mockup/course');

const Subject = require('../../models/subject');
const SubjectMockup = require('../../mockup/subject');

const Examination = require('../../models/examination');
const ExaminationMockup = require('../../mockup/examination');

describe('Creating documents', () => {
    after(()=> { 
        console.log('  End creating documents!'); 
    });
    afterEach((done) => {
        console.log(chalk.white("       |---> _id = "+global.value));
        done();
      });
    it('creates a Term', (done) => {
       
        const term = new Term(TermMockup());
        term.save()
            .then(() => {
                global.term = term;
                global.value = term._id;
                assert(!term.isNew);
                done();
            });
    });
    it('creates a Building',(done) => {
        const building = new Building(BuildingMockup());
        building.save()
            .then(() => {
                global.building = building;
                global.value = building._id;
                assert(!building.isNew);
                done();
            });
        });

    it('creates a Room', (done) => {
        RoomMockup().then((resolve)=>{
            const room = new Room(resolve);
            room.save()
            .then(() => {
                global.room = room;
                global.value = room._id;
                assert(!room.isNew);
                done();
            });
        });
    });

    it('creates a Login', (done) => {
        LoginMockup().then((resolve)=>{
            const login = new Login(resolve);
            login.save()
            .then(() => {
                global.login = login;
                global.value = login._id;
                assert(!login.isNew);
                done();
            });
        });
    });

    it('creates a Teacher', (done) => {
        TeacherMockup().then((resolve)=>{
            const teacher = new Teacher(resolve);
            teacher.save()
            .then(() => {
                global.teacher = teacher;
                global.value = teacher._id;
                assert(!teacher.isNew);
                done();
            });
        });
    });

    it('creates a Student', (done) => {
        StudentMockup().then((resolve)=>{
            const student = new Student(resolve);
            student.save()
            .then(() => {
                global.student = student;
                global.value = student._id;
                assert(!student.isNew);
                done();
            });
        });
    });

    it('creates a Course', (done) => {
        CourseMockup().then((resolve)=>{
            const course = new Course(resolve);
            course.save()
            .then(() => {
                global.course = course;
                global.value = course._id;
                assert(!course.isNew);
                done();
            });
        });
    });

    it('creates a Subject', (done) => {
        SubjectMockup().then((resolve)=>{
            const subject = new Subject(resolve);
            subject.save()
            .then(() => {
                global.subject = subject;
                global.value = subject._id;
                assert(!subject.isNew);
                done();
            });
        });
    });

    it('creates a Examination', (done) => {
        ExaminationMockup().then((resolve)=>{
            const examination = new Examination(resolve);
            examination.save()
            .then(() => {
                global.examination = examination;
                global.value = examination._id;
                assert(!examination.isNew);
                done();
            });
        });
    });

});
