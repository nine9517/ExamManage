const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('mongoose-simple-random');

const courseSchema = new Schema({
    courseNo :{
        type : Number,
        required : true
    },
    student :[{
        type:Schema.Types.ObjectId,
        ref:'student'
    }],
    teacher :[{
        type:Schema.Types.ObjectId,
        ref:'teacher'
    }],
    term :{
        type:Schema.Types.ObjectId,
        ref:'term'
    },
    
});
courseSchema.plugin(random);

const Course = mongoose.model('course',courseSchema,'course');

module.exports = Course;