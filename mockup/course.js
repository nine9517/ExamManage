const faker = require('faker/locale/en');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Term = require('../models/term');


async function random(Model) {
    let num = await Model.countDocuments();
    let numRan =  Math.floor(Math.random() * num);
    let ran = await Model.findOne().skip(numRan).exec();
    return ran;
}

module.exports = async()=> {

    let students = await random(Student)
    let teachers = await random(Teacher)
    let terms = await random(Term)

    return Promise.resolve({
        courseNo :Number.ran(100,999),
        student : [students._id],
        teacher : [teachers._id],
        term : terms._id
    })
    
}