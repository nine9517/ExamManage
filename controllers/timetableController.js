const Subject = require('../models/subject');
const Building = require('../models/building');
const Room = require('../models/room');
const Examination = require('../models/examination');
module.exports = {
	
	index: async (req, res) => {
        console.log(res.locals.Auth.user)
        console.log(req.session.type)
        if(req.session.type=='staff' || req.session.type=='teacher'){
            let exam = await Examination.find({'status':true,'examiner.examiner_id':res.locals.Auth.user._id,$where: "this.roomId.length > 0"}).populate({path:'subject'}).populate({path:'building'})
            if(exam.length>0){
                var rooms = []
                exam.forEach(async function(examroom){
                    examroom.roomId.forEach(async function(element){
                    var room = await Room.findById(element.room)
                    if(room){
                            rooms.push(room.name)
                            if(rooms.length ==examroom.roomId.length ){
                            return res.render('page/timetable',{
                                examination:exam,
                                room:rooms
                            });
                            }
                    }
                });
            })
            }else{
                return res.render('page/timetable');
            }
            // return res.render('page/timetable');
        }else{
            let exam = await Examination.find({'status':true,'sit.student':res.locals.Auth.user._id}).populate({path:'subject'}).populate({path:'building'})
            if(exam){
                return res.render('page/timetableStudent',{
                    examination:exam,
                    student_id:res.locals.Auth.user._id
                });
            }
            else{
                return res.render('page/timetableStudent');
            }

             
            
        }
      
        
    }

}