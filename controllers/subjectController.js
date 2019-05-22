const Term = require('../models/term');
const Subject = require('../models/subject');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const ObjectId = require('mongoose').Types.ObjectId;
module.exports = {
	
	index: async (req, res) => {
        let terms = await Term.find();
        let subjects = await Subject.find();
		return res.render('page/subject',{
            terms:terms,
            subjects:subjects
        });
    },
    add:async (req, res) =>{
        let subject = new Subject({
            subjectName :req.body.name,
            subjectKey :req.body.id,
        })
        await subject.save();
        res.flash('<span uk-icon="icon: check"></span> เพิ่มสำเร็จ','success');
        res.redirect('/subject');
    },
    delete: async (req, res) => {
        let subjectId = req.params.id;
        let subjectData = await Subject.findById(subjectId);
        res.flash('<span uk-icon="icon: check"></span> ลบ '+subjectData.subjectKey+' สำเร็จ','success');
        await subjectData.remove();
        return res.redirect('/subject');
    },
    update: async (req, res) => {
        let subjectId = req.body._id;
        let subjectData = await Subject.findById(subjectId);
        subjectData.subjectKey = req.body.subjectKey;
        subjectData.subjectName = req.body.subjectName;
        await subjectData.save();
        res.flash('<span uk-icon="icon: check"></span> บันทึกข้อมูลสำเร็จ','success');
        return res.redirect('/subject');

    },
    
    viewDatail: async (req, res) => {
        let subjectId = req.params.id;
        let subjectData = await Subject.findById(subjectId);
        res.render('page/subjectDetail', {
            subjectData: subjectData,
        });
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

        return res.render('page/subject', {
            subjects: subject
        });
    }
}