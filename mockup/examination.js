const faker = require('faker/locale/en');
const Courses = require('../models/course');
const Subject = require('../models/subject');
const building = require('../models/building');
const Teacher = require('../models/teacher');
const Term = require('../models/term');
const Room = require('../models/room');


async function random(Model) {
    let num = await Model.countDocuments();
    let numRan =  Math.floor(Math.random() * num);
    let ran = await Model.findOne().skip(numRan).exec();
    return ran;
}
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

module.exports =async ()=> {
    let room = await random(Room)
    let teacher = await random(Teacher)
    let term = await random(Term)
    let start = new Date();
    start.setDate(start.getDate()-Number.ran(1,3));
    let end = new Date();
    end.setDate(start.getDate()-Number.ran(3,6));
        return Promise.resolve({
            subject :(await random(Subject))._id,
            course :(await random(Courses))._id,
            building:(await random(building))._id,
            roomId: [{remain:Number.ran(1,10),room:room._id}],
            examiner: [{
                examiner_id:teacher._id,
                status:"staff",
                firstname:teacher.firstname,
                lastname:teacher.lastname,
                email:teacher.email,
                id:teacher.firstname
            }],
            start: start,
            end: end,
            term: term._id,
            sit: [{
                row:Number.ran(1,10),
                col:"A",
                student:(await random(Subject))._id,
                room:room._id,
                score:Number.ran(100,999),
                roomName:room.name,
            }],
            status:true
        
        })
    

}