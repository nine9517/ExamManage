const Login = require('../models/login');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
var bcrypt = require('bcryptjs');

module.exports = {

    index: async (req, res) => {
        return res.render('page/login');
    },

    login: async (req, res) => {

        let {
            username,
            password
        } = req.body;

        let loginData = await Login.findOne({
            username: username
        });

        let studentLogin = await Student.findOne({
            student_id: username
        })

        let teacherLogin = await Teacher.findOne({
            teacher_id: username
        })

        if(username === "" && password === ""){
            res.flash('<span uk-icon="icon: warning"></span> กรอกข้อมูลไม่ครบ!!', 'danger');
            return res.redirect('/');
        }
        

        if (loginData) {
            req.session.type = 'staff'
            let chackPass = await loginData.isValidPassword(password);
            if (chackPass) {
                req.session.login_user = loginData;
                res.flash('<span uk-icon="icon: happy"></span> ยินดีต้อนรับคุณ ' + loginData.username, 'success');
                return res.redirect('/main');
            } else {
                res.flash('<span uk-icon="icon: warning"></span> รหัสผ่านไม่ถูกต้อง!!', 'danger');
                return res.redirect('/');
            }

        }else if(studentLogin){

            let chackPass = await studentLogin.isValidPassword(password);

            if (chackPass) {
                req.session.login_user = studentLogin;
                req.session.type = 'student'
                res.flash('<span uk-icon="icon: happy"></span> ยินดีต้อนรับคุณ ' + studentLogin.firstname, 'success');
                return res.redirect('/main');
            } else {
                res.flash('<span uk-icon="icon: warning"></span> รหัสผ่านไม่ถูกต้อง!!', 'danger');
                return res.redirect('/');
            }

        }else if(teacherLogin){
            
            let chackPass = await teacherLogin.isValidPassword(password);
            if (chackPass) {
                req.session.login_user = teacherLogin;
                req.session.type = 'teacher'
                res.flash('<span uk-icon="icon: happy"></span> ยินดีต้อนรับคุณ ' + teacherLogin.firstname, 'success');
                return res.redirect('/main');
            } else {
                res.flash('<span uk-icon="icon: warning"></span> รหัสผ่านไม่ถูกต้อง!!', 'danger');
                return res.redirect('/');
            }

        }

        res.flash('<span uk-icon="icon: warning"></span> ชื่อผู้ใช้ไม่ถูกต้อง!!', 'danger');
        res.redirect('/');
    },

    logOut: async (req, res) => {
        // console.log(req.session);
        
        req.session.login_user = undefined;

        // console.log('frame'+req.session);
        
        res.flash('<span uk-icon="icon: check"></span> ออกจากระบบสำเร็จ', 'success');
        res.redirect('/');
    },

    check: async (req, res) => {

    },

    addUser: async (req, res) => {
        console.log(req.body);
        
        let {
            username,
            password,
            status,
            firstname,
            lastname,
            email
        }= req.body
        
        const salt = await bcrypt.genSalt(10);
        const passwordH = await bcrypt.hash(password, salt);
        let temp = await Login.find({username:username})
        if(temp.length > 0){
            res.flash('<span uk-icon="icon: check"></span> User มีในระบบแล้ว', 'warning');
            res.redirect('/staff');
        }else{
            let login = new Login({
                username:username,
                password:passwordH,
                status:status,
                firstname:firstname,
                lastname:lastname,
                email:email
            })

            login.save();
            res.flash('<span uk-icon="icon: check"></span> เพิ่มสำเร็จ', 'success');
            res.redirect('/staff');
        }
    },
    updateStaff: async (req, res) => {
        // console.log(req.body);
        
        let userId = req.body._id;
        // console.log(req.body);
        let userData = await Login.findById(userId);
        console.log(userData);
        
        userData.firstname = req.body.firstname;
        userData.lastname = req.body.lastname;
        userData.email = req.body.email;
        await userData.save();
        res.flash('<span uk-icon="icon: check"></span> บันทึกข้อมูลสำเร็จ','success');
        return res.redirect('/staff');
    },

    delStaff: async (req, res) => {
        let userId = req.params.id;
        let userData = await Login.findById(userId);
        res.flash('<span uk-icon="icon: check"></span> ลบ '+userData.firstname+' สำเร็จ','success');
        await userData.remove();
        return res.redirect('/staff');
    },
    viewDatailStaff: async (req, res) => {
        let userId = req.params.id;
        let userData = await Login.findById(userId);
        res.render('page/staffDetail', {
            staffData: userData
        });
    },
    staff: async (req, res) => {
        let data = await Login.find();
        return res.render('page/staff',{
            staff: data
        });

    }
}
