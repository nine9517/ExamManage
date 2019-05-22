const faker = require('faker/locale/en');
const Courses = require('../models/course');

async function randomArr(Model,size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        let num = await Model.countDocuments();
        let numRan =  Math.floor(Math.random() * num);
        let ran = await Model.findOne().skip(numRan).exec();
        arr.push(ran);
        
    }
    
    return arr;
}
module.exports = async ()=> {
    
        return Promise.resolve({
            subjectName :faker.name.jobDescriptor(),
            subjectKey :"8859"+Number.ran(1,999).pad(3),
            course : await randomArr(Courses,Number.ran(1,5))
        })
}