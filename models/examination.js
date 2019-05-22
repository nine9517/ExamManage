const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const thaimonth = require('../helpers/date').month.thai
const random = require('mongoose-simple-random');
const examinationSchema = new Schema({

   
    subject :{
        type:Schema.Types.ObjectId,
        ref:'subject'
    },
    course :{
        type:Schema.Types.ObjectId,
        ref:'course'
    },
    building:{
        type:Schema.Types.ObjectId,
        ref:'building'
    },
    roomId: [{
        remain:Number,
        room:{
        type:Schema.Types.ObjectId,
        ref:'room'}
        }],
    examiner: [{
        examiner_id:{
            type:Schema.Types.ObjectId,
            ref:'teacher'},
        status:String,
        firstname:String,
        lastname:String,
        email:String,
        id:String
    }],
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    term: {
        type:Schema.Types.ObjectId,
        ref:'term',
        required: true
    },
    sit: [{
        row:Number,
        col:String,
        student:{
            type:Schema.Types.ObjectId,
            ref:'student'
        },
        room:{type:Schema.Types.ObjectId,
        ref:'room'
        },
        score:0,
        roomName:String,
    }],
    status:{
        type:Boolean,
        default:false
    }

}, {
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }
});
examinationSchema.plugin(random);
examinationSchema.methods.getRoom = async function (rooms) {
    console.log(rooms)
    var roomArr = []
    rooms.forEach(async function(room) {    
        var temp =  await Room.findById(room.room);
        if(temp){
            roomArr.push(temp.name)  
        }
                
    }); 
    console.log(roomArr)            
    // var room =  await Room.findById(rooms);
    // console.log(room)
    // return room
}
examinationSchema.methods.getDate = function (id) {
    var start = this.start.getTime() +" "+this.start.getDate() + " " + thaimonth[this.start.getMonth()]
    var end = this.end.getTime() +" "+this.end.getDate() + " " + thaimonth[this.end.getMonth()]
    return start +"-"+end
}

examinationSchema.methods.getRoomStudent = function (student_id) {
    this.sit.forEach(function(siter){
        if(siter.student == student_id){
            console.log("chainrocker:"+siter.roomName)
            return siter.roomName
        }
    })
}

examinationSchema.methods.getDay =  function () {
    var day = this.start.toDateThai();
    return day
}
examinationSchema.methods.getTimeStart =  function () {
    return this.start.toTimeStr()
}
examinationSchema.methods.getTimeEnd =  function () {
    return this.end.toTimeStr()
}

// function getBuilding(id){
//     let build = await Building.findById(id);
//     return build
// }
const Examination = mongoose.model('examination', examinationSchema, 'examination');


module.exports = Examination;