const Term = require('../models/term');
const Course = require('../models/course');
const Examination = require('../models/examination');
module.exports = {

    index: async (req, res) => {
        let terms = await Term.find().sort({
            '_id': -1
        })
        res.render('page/term', {
            terms: terms
        });
    },
    add: async (req, res) => {
        let term = new Term({
            termNo: req.body.no,
            year: req.body.year,
            start: new Date(req.body.start),
            end: new Date(req.body.end)
        });
        await term.save();
        res.flash('<span uk-icon="icon: check"></span> เพิ่มสำเร็จ', 'success');
        res.redirect('/term');
    },
    edit: async (req, res) => {
        let termId = req.params.id;
        let termData = await Term.findById(termId);
        res.render('page/termDetail', {
            termData: termData
        });
    },
    update: async (req, res) => {
        let termId = req.body._id;
        let termData = await Term.findById(termId);

        termData.termNo = req.body.termNo;
        termData.year = req.body.year;
        termData.start = new Date(req.body.start)
        termData.end = new Date(req.body.end)
        console.log(termData.start);
        
        await termData.save();
        res.flash('<span uk-icon="icon: check"></span> บันทึกข้อมูลสำเร็จ', 'success');
        return res.redirect('/term');

    },
    delete: async (req, res) => {
        let termId = req.params.id;
        let termData = await Term.findById(termId);
   
        // let examination = await Examination.find({term:termId});
        // let course = await Course.find({term:termId});
        await Examination.remove({term:termId});
        await Course.remove({term:termId});
        await termData.remove();
        res.flash('<span uk-icon="icon: check"></span> ลบสำเร็จ', 'success');
        return res.redirect('/term');
    },
}