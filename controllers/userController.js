const ExcelReader = require('node-excel-stream').ExcelReader;
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const bcrypt = require('bcryptjs');

module.exports = {

    index: async (req, res) => {
        return res.render('page/usermanage');
    },

    viewStudent: async (req, res) => {

        var perPage = 9
        var page = 1

        let student = await Student.find().limit(perPage);
        let count = await Student.count();

        return res.render('page/student', {
            studentData: student,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    },
    viewStudentPerPage: async (req, res) => {
        console.log(req.params.page);

        var perPage = 9
        var page = req.params.page || 1

        let student = await Student.find().skip((perPage * page) - perPage).limit(perPage);
        let count = await Student.count();

        return res.render('page/student', {
            studentData: student,
            current: page,
            pages: Math.ceil(count / perPage)
        });

    },
    searchStudent: async (req, res) => {
        let student = await Student.find({
            $or: [{
                student_id: new RegExp(req.params.key, 'i')
            }, {
                firstname: new RegExp(req.params.key, 'i')
            }, {
                lastname: new RegExp(req.params.key, 'i')
            }]
        }, {
            score: {
                $meta: "textScore"
            }
        }).sort({
            score: {
                $meta: "textScore"
            }
        }).limit(10);
        return res.json(student);
    },
    searchTeacher: async (req, res) => {
        let teacher = await Teacher.find({
            $or: [{
                teacher_id: new RegExp(req.params.key, 'i')
            }, {
                firstname: new RegExp(req.params.key, 'i')
            }, {
                lastname: new RegExp(req.params.key, 'i')
            }]
        }, {
            score: {
                $meta: "textScore"
            }
        }).sort({
            score: {
                $meta: "textScore"
            }
        }).limit(10);
        return res.json(teacher);
    },
    add: async (req, res) => {
        let {
            type,
            id,
            passwd,
            firstname,
            lastname,
            email
        } = req.body;

        const password = passwd;
        const salt = await bcrypt.genSalt(10);
        const passwordH = await bcrypt.hash(password, salt);

        if (type == 'student') {
            let temp = await Student.find({student_id:id})
            console.log(temp)
            console.log(temp.length)
            if(temp.length  > 0){
                res.flash('<span uk-icon="icon: check"></span> User มีอยู่ในระะบบแล้ว', 'warning');
                res.redirect('student');
            }else{
                let student = new Student({
                    student_id: id,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: passwordH
                })
                
                await student.save();
                res.flash('<span uk-icon="icon: check"></span> เพิ่มสำเร็จ', 'success');
                res.redirect('student');
            }
          
        } else {
            let temp = await Teacher.find({teacher_id:id})
            if(temp.length > 0){
                res.flash('<span uk-icon="icon: check"></span> User มีอยู่ในระะบบแล้ว', 'warning');
                res.redirect('teacher');
            }else{
                let teacher = new Teacher({
                    teacher_id: id,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: passwordH
                })
                await teacher.save();
                res.flash('<span uk-icon="icon: check"></span> เพิ่มสำเร็จ', 'success');
                res.redirect('teacher');
            }         
        }



    },
    viewTeacher: async (req, res) => {

        var perPage = 9
        var page = req.params.page || 1

        let teacher = await Teacher.find({}).limit(perPage);
        let count = await Teacher.count();
        // console.log(count);
        

        return res.render('page/teacher', {
            teacherData: teacher,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    },

    viewTeacherPerpage: async (req, res) => {

        var perPage = 9
        var page = req.params.page || 1

        let teacher = await Teacher.find().skip((perPage * page) - perPage).limit(perPage);
        let count = await Teacher.count();
        // console.log(count);
        

        return res.render('page/teacher', {
            teacherData: teacher,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    },

    viewDatailTeacher: async (req, res) => {
        let userId = req.params.id;
        let userData = await Teacher.findById(userId);
        res.render('page/teacherDetail', {
            teacherData: userData
        });
    },

    updateTeacher: async (req, res) => {
        let userId = req.body._id;
        console.log(req.body);
        let userData = await Teacher.findById(userId);

        userData.teacher_id = req.body.teacher_id;
        userData.firstname = req.body.firstname;
        userData.lastname = req.body.lastname;
        userData.email = req.body.email;
        await userData.save();
        res.flash('<span uk-icon="icon: check"></span> บันทึกข้อมูลสำเร็จ', 'success');
        return res.redirect('/manageuser/teacher/');

        // res.redirect('/manageuser/student');
    },

    delTeacher: async (req, res) => {
        let userId = req.params.id;
        let userData = await Teacher.findById(userId);
        res.flash('<span uk-icon="icon: check"></span> ลบ ' + userData.firstname + ' สำเร็จ', 'success');
        await userData.remove();
        return res.redirect('/manageuser/teacher/');
    },

    viewDatailStudent: async (req, res) => {
        // console.log(req.flash('key'));
        let userId = req.params.id;
        let userData = await Student.findById(userId);
        res.render('page/studentDetail', {
            studentData: userData
        });
    },

    updateStudent: async (req, res) => {
        let userId = req.body._id;
        console.log(req.body);
        let userData = await Student.findById(userId);

        userData.student_id = req.body.student_id;
        userData.firstname = req.body.firstname;
        userData.lastname = req.body.lastname;
        userData.email = req.body.email;
        await userData.save();
        res.flash('<span uk-icon="icon: check"></span> บันทึกข้อมูลสำเร็จ', 'success');


        return res.redirect('/manageuser/student/');
    },

    delStudent: async (req, res) => {
        let userId = req.params.id;
        let userData = await Student.findById(userId);
        res.flash('<span uk-icon="icon: check"></span> ลบ ' + userData.firstname + ' สำเร็จ', 'success');
        await userData.remove();
        return res.redirect('/manageuser/student/');
    },

    uploadUser: (req, res) => {
        console.log("uploading");
        // console.log(req.busboy);

        // let salt = await bcrypt.genSalt(10);
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            console.log(fieldname);
            if (fieldname == "student") {
                let fileStudent = file;
                let reader = new ExcelReader(fileStudent, {
                    sheets: [{
                        name: 'Sheet1',
                        rows: {
                            headerRow: 1,
                            allowedHeaders: [{
                                name: 'student_id',
                                key: 'student_id'
                            }, {
                                name: 'firstname',
                                key: 'firstname'
                            }, {
                                name: 'lastname',
                                key: 'lastname'
                            }, {
                                name: 'email',
                                key: 'email'
                            }, {
                                name: 'password',
                                key: 'password'
                            }]
                        }
                    }]
                })

                console.log('starting parse : ' + fieldname);
                reader.eachRow(async (rowData, rowNum, sheetSchema) => {
                        console.log(rowData);
                        // let student = new Student(rowData);
                        let {
                            student_id,
                            firstname,
                            lastname,
                            email,
                            password
                        } = rowData;
                        let salt = await bcrypt.genSalt(10);
                        let passwordH = await bcrypt.hash(password.toString(), salt);

                        let student = new Student({
                            student_id: student_id,
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            password: passwordH
                        })
                        await student.save();
                    })
                    .then(() => {
                        console.log('done parsing : ' + fieldname + "FRAME");
                    });
            }

            if (fieldname == "teacher") {
                let fileteacher = file;
                let teacherReader = new ExcelReader(fileteacher, {
                    sheets: [{
                        name: 'Sheet1',
                        rows: {
                            headerRow: 1,
                            allowedHeaders: [{
                                name: 'teacher_id',
                                key: 'teacher_id'
                            }, {
                                name: 'firstname',
                                key: 'firstname'
                            }, {
                                name: 'lastname',
                                key: 'lastname'
                            }, {
                                name: 'email',
                                key: 'email'
                            }, {
                                name: 'password',
                                key: 'password'
                            }]
                        }
                    }]
                })
                console.log('starting parse : ' + fieldname);
                teacherReader.eachRow(async (rowData, rowNum, sheetSchema) => {
                    console.log(rowData);
                    bcrypt.hash(teacher_id, salt)
                    let {
                        teacher_id,
                        firstname,
                        lastname,
                        email,
                        password
                    } = rowData;
                    let salt = await bcrypt.genSalt(10);
                    let passwordH = await bcrypt.hash(password.toString(), salt);

                    let teacher = new Teacher({
                        teacher_id: teacher_id,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: passwordH
                    })
                    await teacher.save();

                }).then(() => {
                    console.log('done parsing : ' + fieldname);
                })

            }

        });
        console.log("redirect");
        res.flash('<span uk-icon="icon: check"></span> อัพโหลดไฟล์สำเร็จ', 'success');
        res.redirect('/main');
    }
}