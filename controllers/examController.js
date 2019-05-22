const Subject = require('../models/subject');
const Building = require('../models/building');
const Room = require('../models/room');
const Course = require('../models/course');
const Examination = require('../models/examination');
const Term = require('../models/term');
const Teacher = require('../models/teacher');
const Staff = require('../models/login');
module.exports = {

    index: async (req, res) => {
        var subject = await Subject.find();
        res.render('page/exammanage', {
            subjects: subject
        });
    },
    viewExam: async (req, res) => {
        var subject = await Subject.find();
        res.render('page/viewExam', {
            subjects: subject
        });
    },
    manageCourse: async (req, res) => {
        let subject = await Subject.findById(req.params.id).populate({
            path: 'course',
            populate: [{
                path: 'student'
            }, {
                path: 'teacher'
            }]
        })
        res.render('page/examcourse', {
            subject: subject,
        });
    },
    viewExamCourse: async (req, res) => {
        let subject = await Subject.findById(req.params.id).populate({
            path: 'course',
            populate: [{
                path: 'student'
            }, {
                path: 'teacher'
            }]
        })
        res.render('page/viewExamCourse', {
            subject: subject,
        });
    },
    manageCourseDetail: async (req, res) => {
        let subject = await Subject.findById(req.params.sub).populate({
            path: 'course',
            populate: [{
                path: 'student'
            }, {
                path: 'teacher'
            }]
        })
        let course = await Course.findById(req.params.id)
        let exam = await Examination.find({
            course: course._id
        }).populate({
            path: 'term'
        }).populate({
            path: 'subject'
        })

        res.render('page/examcourseManage', {
            subject: subject,
            course: course,
            examination: exam
        });
    },
    viewExamCourseDetail: async (req, res) => {
        let subject = await Subject.findById(req.params.sub).populate({
            path: 'course',
            populate: [{
                path: 'student'
            }, {
                path: 'teacher'
            }]
        })
        let course = await Course.findById(req.params.id)
        let exam = await Examination.find({
            course: course._id
        }).populate({
            path: 'term'
        }).populate({
            path: 'subject'
        }).populate({
            path: 'building'
        }).populate('roomId.room').populate('sit.student')

        res.render('page/viewExamCourseDetail', {
            subject: subject,
            course: course,
            examination: exam
        });
    },
    addExam: async (req, res) => {
        let term = await Term.findOne().sort({
            _id: -1
        }).exec()
        var examination = new Examination()
        examination.course = req.params.id
        examination.start = new Date()
        examination.end = new Date()
        examination.term = term._id
        examination.subject = req.params.sub
        await examination.save()
        res.redirect('/exam/manage/course/' + req.params.sub + '/' + req.params.id);
    },
    delExam: async (req, res) => {
        let examination = await Examination.findById(req.params.exam)

        await examination.remove()
        res.redirect('/exam/manage/course/' + req.params.sub + '/' + req.params.id);
    },
    delExamView: async (req, res) => {
        let examination = await Examination.findById(req.params.exam)

        await examination.remove()
        res.redirect('/exam/view/course/' + req.params.sub + '/' + req.params.id);
    },
    searchRoom: async (req, res) => {

        var buildingId = req.body.building_id
        let subject = await Subject.findById(req.body.subject_id).populate({
            path: 'course',
            populate: [{
                path: 'student'
            }, {
                path: 'teacher'
            }]
        })
        let course = await Course.findById(req.body.id)
        let build = await Building.find();
        let date = req.body.date
        var start = new Date(date)
        var end = new Date(date)
        let examination = await Examination.findById(req.body.examination_id)
        let start_str = req.body.start.split(":")

        start.setHours(parseInt(start_str[0]))
        start.setMinutes(parseInt(start_str[1]))

        let end_str = req.body.end.split(":")
        end.setHours(parseInt(end_str[0]))
        end.setMinutes(parseInt(end_str[1]))
        var roomExam = []
        var roomExamUse = []
        var roomExamUseRemain = []
        if (!isValidDate(start) && !isValidDate(end)) {
            console.log("false date")
        } else {
            let examinationSearch = await Examination.find({
                $and: [{
                    "start": {
                        "$gte": start
                    }
                }, {
                    'end': {
                        "$lte": end
                    }
                }]
            }).populate('roomId.room')

            examinationSearch.forEach(function (element) {
                if (req.body.roomSearch == '0') {
                    element.roomId.forEach(function (room) {
                        if (room.remain >= course.student.length) {
                            for (var i = 0; i < roomExamUse.length; i++) {
                                if (roomExamUse[i].equals(room.room._id)) {
                                    roomExamUseRemain[i] = room.remain
                                }
                            }
                            roomExamUse.push(room.room)
                            roomExamUseRemain.push(room.remain)
                        } else {

                        }
                    });
                } else {
                    element.roomId.forEach(function (room) {
                        roomExam = roomExam.concat(room.room)
                    })
                }

            });
            console.log("roomExam:" + roomExam)
            console.log("roomExamUse:" + roomExamUse)
            console.log("roomExamUseRemain:" + roomExamUseRemain)
        }

        if (req.body.roomSearch == '0') {
            let room = await Room.find({
                building: buildingId,
                _id: {
                    $in: roomExamUse
                }
            }).populate('building')
            var roomArray = []
            var i = 0
            room.forEach(function (element) {
                roomArray.push({
                    _id: element._id,
                    name: element.name,
                    row: element.row,
                    col: element.col,
                    building: element.building,
                    size: element.size,
                    remain: roomExamUseRemain[i++]
                })
            });
            res.render('page/examRoom', {
                buildingData: build,
                rooms: roomArray,
                subject: subject,
                course: course,
                data: req.body,
                inputDate: req.body.date,
                examination: examination,
                status: true
            });
        } else {
            let room = await Room.find({
                building: buildingId,
                _id: {
                    $nin: roomExam
                },
                size: {
                    "$gte": course.student.length
                }
            }).populate('building')
            res.render('page/examRoom', {
                buildingData: build,
                rooms: room,
                subject: subject,
                course: course,
                data: req.body,
                inputDate: req.body.date,
                examination: examination,
                status: false
            });
        }

    },
    searchExaminer: async (req, res) => {
        let examination = await Examination.findById(req.body.examination_id)
        let subject = await Subject.findById(req.body.subject_id)
        let course = await Course.findById(req.body.id)
        let start_str = req.body.start.split(":")
        let date = req.body.date
        var start = new Date(date)
        var end = new Date(date)
        start.setHours(parseInt(start_str[0]))
        start.setMinutes(parseInt(start_str[1]))

        let end_str = req.body.end.split(":")
        end.setHours(parseInt(end_str[0]))
        end.setMinutes(parseInt(end_str[1]))

        var examiner = []

        if (!isValidDate(start) && !isValidDate(end)) {
            console.log("false date")
        } else {
            let examinationSearch = await Examination.find({
                $and: [{
                    "start": {
                        "$gte": start
                    }
                }, {
                    'end': {
                        "$lte": end
                    }
                }]
            })
            console.log(examinationSearch.length);

            examinationSearch.forEach(function (element) {
                element.examiner.forEach(function (exam) {
                    examiner.push(exam.examiner_id)
                });
            });
        }

        if (req.body.search == '0') {
            let teacher = await Teacher.find({
                _id: {
                    $nin: examiner
                }
            })
            res.render('page/examExaminer', {
                data: req.body,
                inputDate: req.body.date,
                examination: examination,
                examiner: teacher,
                subject: subject,
                course: course,
                type: 'teacher'
            });
        } else {
            let staff = await Staff.find({
                _id: {
                    $nin: examiner
                }
            })
            res.render('page/examExaminer', {
                data: req.body,
                inputDate: req.body.date,
                examination: examination,
                examiner: staff,
                subject: subject,
                course: course,
                type: 'staff'
            });
        }

    },

    manageRoom: async (req, res) => {
        let examination = await Examination.findById(req.params.exam)
        let course = await Course.findById(req.params.id)
        let subject = await Subject.findById(req.params.sub).populate({
            path: 'course',
            populate: [{
                path: 'student'
            }, {
                path: 'teacher'
            }]
        })
        let build = await Building.find();
        res.render('page/examRoom', {
            buildingData: build,
            subject: subject,
            course: course,
            data: "",
            inputDate: new Date().toDateStr(),
            examination: examination

        });
    },

    manageExaminer: async (req, res) => {
        let examination = await Examination.findById(req.params.exam)
        let course = await Course.findById(req.params.id)
        let subject = await Subject.findById(req.params.sub).populate({
            path: 'course',
            populate: [{
                path: 'student'
            }, {
                path: 'teacher'
            }]
        })
        res.render('page/examExaminer', {
            subject: subject,
            course: course,
            data: "",
            inputDate: new Date().toDateStr(),
            examination: examination

        });
    },
    saveExaminer: async (req, res) => {
        let obj = JSON.parse(decodeURIComponent(req.body.data))
        let {
            subject_id,
            building_id,
            examiner
        } = obj
        let examination = await Examination.findById(req.body.examination_id)
        if (Array.isArray(req.body.examiner)) {
            req.body.examiner.forEach(async function (element) {

                if (req.body.type == 'teacher') {
                    var teacher = await Teacher.findById(element)
                    if (teacher) {
                        examination.examiner.push({
                            examiner_id: teacher._id,
                            status: 'teacher',
                            firstname: teacher.firstname,
                            lastname: teacher.lastname,
                            email: teacher.email,
                            id: teacher.teacher_id
                        })
                        await examination.save()
                    }
                } else {
                    var staff = await Staff.findById(element)
                    if (staff) {
                        examination.examiner.push({
                            examiner_id: staff._id,
                            status: 'staff',
                            firstname: staff.firstname,
                            lastname: staff.lastname,
                            email: staff.email,
                            id: staff.username

                        })
                        await examination.save()
                    }
                }

            });
        } else {
            console.log(req.body.type);
            if (req.body.type == 'teacher') {
                var teacher = await Teacher.findById(req.body.examiner)
                console.log(teacher);

                if (teacher) {
                    examination.examiner.push({
                        examiner_id: teacher._id,
                        status: 'teacher',
                        firstname: teacher.firstname,
                        lastname: teacher.lastname,
                        email: teacher.email,
                        id: teacher.teacher_id
                    })
                    await examination.save()
                }

            } else {
                var staff = await Staff.findById(req.body.examiner)
                if (staff) {
                    examination.examiner.push({
                        examiner_id: staff._id,
                        status: 'staff',
                        firstname: staff.firstname,
                        lastname: staff.lastname,
                        email: staff.email,
                        id: staff.username

                    })
                    await examination.save()
                }

            }
        }
        await examination.save()
        res.flash('<span uk-icon="icon: warning"></span> บันทึกสำเร็จ', 'success');

        res.redirect('/exam/manage/course/' + subject_id + '/' + req.params.id)

    },
    saveRoom: async (req, res) => {
        let obj = JSON.parse(decodeURIComponent(req.body.data))
        let {
            subject_id,
            building_id
        } = obj
        let examination = await Examination.findById(req.body.examination_id)
        let start = new Date(obj.date)
        let start_str = obj.start.split(":")
        start.setHours(parseInt(start_str[0]))
        start.setMinutes(parseInt(start_str[1]))
        let end = new Date(obj.date)
        let end_str = obj.end.split(":")
        end.setHours(parseInt(end_str[0]))
        end.setMinutes(parseInt(end_str[1]))
        examination.start = start
        examination.end = end
        examination.building = building_id



        var rooms = []
        if (Array.isArray(req.body.rooms)) {
            rooms = req.body.rooms
            rooms.forEach(function (element) {
                examination.roomId.push({
                    remain: 0,
                    room: element
                })
            });
        } else {
            rooms = []
            rooms.push(req.body.rooms);
            examination.roomId.push({
                remain: 0,
                room: req.body.rooms
            })
        }
        let examinationSearch = await Examination.find({
            $and: [{
                "start": {
                    "$gte": start
                }
            }, {
                'end': {
                    "$lte": end
                }
            }, {
                $where: "this.roomId.length > 0"
            }]
        })
        var roomExamUse = []
        examinationSearch.forEach(function (element) {
            element.roomId.forEach(function (room) {
                roomExamUse.push(room.room)
            });
        });
        console.log(roomExamUse)


        await examination.save()

        await manageSeat(rooms, req.body.examination_id, roomExamUse, examinationSearch)
        res.flash('<span uk-icon="icon: warning"></span> บันทึกสำเร็จ', 'success');
        res.redirect('/exam/manage/course/' + subject_id + '/' + req.params.id)

    },
    search: async (req, res) => {
        let subject = await Subject.find({
            $or: [{
                subjectKey: new RegExp(req.params.key, 'i')
            }, {
                subjectName: new RegExp(req.params.key, 'i')
            }]
        });
        console.log(subject);

        return res.render('page/exammanage', {
            subjects: subject
        });
    },
    announceExam: async (req, res) => {
        let examination = await Examination.findById(req.params.exam)
        examination.status = true
        await examination.save()
        res.redirect('/exam/view/course/' + req.params.sub + '/' + req.params.id);
    }
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
async function manageSeat(roomArr, examination_id, roomExamUse, examinationSearch) {
    let examination = await Examination.findById(examination_id)
    let course = await Course.findById(examination.course)
    var rooms = roomArr
    var r = 0;
    var rTemp = 0;
    var numStudentTemp = 0;

    var key = 65
    if (course) {
        var sizeStudent = course.student.length
        var student = course.student
        var count = 0;
        console.log(sizeStudent)
        while (true) {
            if (r < rooms.length) {
                var room = await Room.findById(rooms[r++])
                var numRoomTemp = room.size;
                await roomExamUse.forEach(function (data) {
                    if (data.equals(room._id)) {
                        let tempExam = examinationSearch[examinationSearch.length - 1]
                        let tempSit = tempExam.sit[tempExam.sit.length - 1]
                        rTemp = tempSit.row
                        key = tempSit.col.charCodeAt(0)
                        numStudentTemp = tempExam.sit.length
                        numRoomTemp = tempExam.roomId[tempExam.roomId.length - 1].remain
                    }
                });

                if (room && count < sizeStudent && examination.sit.length < sizeStudent) {
                    var tempCount = 0;
                    for (i = 0; i < room.col; i++) {
                        tempCount = 0
                        for (j = rTemp - 1; j < room.row; j++) {
                            tempCount = count;
                            if (count < sizeStudent) {
                                //String.fromCharCode(65)
                                examination.sit.push({
                                    row: j + 2,
                                    col: String.fromCharCode(key),
                                    student: student[count++],
                                    room: room,
                                    roomName: room.name,
                                })
                            } else {
                                examination.roomId[r - 1].remain = room.size - tempCount - (room.size - numRoomTemp)
                                break
                            }
                        }
                        key++
                    }
                    await examination.save()
                } else {
                    examination.roomId[r - 1].remain = room.size
                    await examination.save()
                }
            } else {
                break
            }
        }

    }

}