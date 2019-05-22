const Examination = require('../models/examination');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Room = require('../models/room');
const Building = require('../models/building');

module.exports = async (req, res) => {
    let roomCount = await Room.aggregate([
        {
            $group: {
                _id: "$building",
                count: { $sum: 1 }
            }
        }
    ]).exec()
    
    let roomArr = [];
    for (let i = 0; i < roomCount.length; i++) {
        let room = roomCount[i];
        let b = await Building.findById(room._id);
        roomArr.push({
            name:b.building_name,
            num:room.count
        })
    }
    
    return res.render('page/main',{
        Examination:await Examination.countDocuments(),
        Student:await Student.countDocuments(),
        Teacher:await Teacher.countDocuments(),
        Buildings:roomArr
    });
}