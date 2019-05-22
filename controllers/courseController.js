const Term = require('../models/term');
const Subject = require('../models/subject');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const ObjectId = require('mongoose').Types.ObjectId;
module.exports = {
	
	index: async (req, res) => {
        let subjects = await Subject.find();
		return res.render('page/course',{
            subjects:subjects
        });
    },
    manage: async (req, res) => {
        let subject = await Subject.findOne({_id:new ObjectId(req.params.id)}).populate({path:'course',populate:[{path:'student'},{path:'teacher'},,{path:'term'}]})
        console.log(subject);
        
		return res.render('page/courseManage',{
            subject:subject
        });
    }
    ,
    CourseAdd:async (req, res) =>{
        let term = await  Term.findOne().sort({_id: -1}).exec()
        let subject = await Subject.findById(req.params.id)
        let course = new Course({
            courseNo:req.body.no,
            term:term._id
        });
        await course.save();
        subject.course.push(course._id);
        await subject.save();
        res.flash('<span uk-icon="icon: check"></span> เพิ่มสำเร็จ','success');
        res.redirect('/course/manage/'+req.params.id);
    }
    ,
    CourseStudentAdd:async (req, res) =>{
        let course = await Course.findById(req.params.id)
        let student = await Student.findOne({student_id:req.body.id})
        course.student.push(student._id);
        await course.save();
        
        res.flash('<span uk-icon="icon: check"></span> เพิ่มสำเร็จ','success');
        res.redirect('/course/manage/'+req.params.sub);
    }
    ,
    CourseStudentDel:async (req, res) =>{
        let course = await Course.findById(req.params.id)
        let student = await Student.findOne({student_id:req.params.token})
        course.student=course.student.filter((value)=>{
            return student._id.toString()!=value.toString();
        });
        await course.save();
        
        res.flash('<span uk-icon="icon: check"></span> ลบสำเร็จ','success');
        res.redirect('/subject/manage/'+req.params.sub);
    }
    ,
    CourseTeacherAdd:async (req, res) =>{
        let course = await Course.findById(req.params.id)
        let teacher = await Teacher.findOne({teacher_id:req.body.id})
        course.teacher.push(teacher._id);
        await course.save();
        
        res.flash('<span uk-icon="icon: check"></span> เพิ่มสำเร็จ','success');
        res.redirect('/course/manage/'+req.params.sub);
    }
    ,
    CourseTeacherDel:async (req, res) =>{
        let course = await Course.findById(req.params.id)
        let teacher = await Teacher.findOne({teacher_id:req.params.token})
        course.teacher=course.teacher.filter((value)=>{
            return teacher._id.toString()!=value.toString();
        });
        await course.save();
        
        res.flash('<span uk-icon="icon: check"></span> ลบสำเร็จ','success');
        res.redirect('/course/manage/'+req.params.sub);
    },
    viewStudent: async (req, res) => {
		return res.render('page/courseStudent',{
        });
    },
    viewTeacher: async (req, res) => {
		return res.render('page/courseTeacher',{
        });
    },
    CourseGroupDel: async(req,res) => {
        let course = await Course.findById(req.params.id)
        let subject = await Subject.findOne({course:req.params.id})

        await Subject.update({ _id: subject._id }, { "$pull": { "course": new ObjectId(req.params.id) }  }, { safe: true }, function(err, obj) {
            //do something smart
        });
        await course.remove();
        res.redirect('/course/manage/'+req.params.sub);
    },
    search: async (req, res) => {
        console.log(req.params.key);
        
        let subject = await Subject.find({
            $or: [{
                subjectKey: new RegExp(req.params.key, 'i')
            }, {
                subjectName: new RegExp(req.params.key, 'i')
            }]
        });
        console.log(subject);

        return res.render('page/course', {
            subjects: subject
        });
    }
    
}