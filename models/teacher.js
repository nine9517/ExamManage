const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
const random = require('mongoose-simple-random');

const teacherSchema = new Schema({
    teacher_id :{
        type : String,
        required : true,
        unique : true,
    },
    firstname :{
        type : String,
        required : true,
    },
    lastname :{
        type: String,
        required : true,
    },
    email : {
        type: String,
        required : true,
    },
	password: {
		type: String,
		required: true
	}
}, { 
	timestamps: { 
		createdAt: 'create_at' ,
		updatedAt: 'update_at'
	}
});
teacherSchema.plugin(random);
// teacherSchema.pre('save', async function (next) {
// 	try {
// 		const salt = await bcrypt.genSalt(10);
// 		const passwordHash = await bcrypt.hash(this.password, salt);
// 		this.password = passwordHash;
// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// });

teacherSchema.methods.isValidPassword = async function (newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (error) {
		throw new Error(error);
	}
}

const Teacher = mongoose.model('teacher',teacherSchema,'teacher');

module.exports = Teacher;