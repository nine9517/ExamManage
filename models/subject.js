const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('mongoose-simple-random');

const subjectSchema = new Schema({
    subjectName :{
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    subjectKey :{
        type : String,
        required : true,
        lowercase : true
    },
    course :[{
        type:Schema.Types.ObjectId,
        ref:'course'
    }]


});
subjectSchema.plugin(random);
subjectSchema.methods.getByCourse = async function (id) {
    var examination = await this.model('examination').findOne({ course:id })
    if(examination){
        return examination
    }else{

        return null
    }
}

const Subject = mongoose.model('subject',subjectSchema,'subject');

module.exports = Subject;

