const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const thaimonth = require('../helpers/date').month.thai
const random = require('mongoose-simple-random');

const termSchema = new Schema({
    termNo :{
        type : Number,
        required : true
    },
    year :{
        type : Number,
        required : true
    },
    start:Date,
    end:Date
}
, {
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }
});
termSchema.methods.getDateStart = function () {
	return this.start.toDateThai();
}
termSchema.methods.getDateEnd = function () {
	return this.end.toDateThai();
}
termSchema.methods.getDateCStart = function () {
	return this.start.toDateStr()
}
termSchema.methods.getDateCEnd = function () {
	return this.end.toDateStr() 
}
termSchema.plugin(random);

const Term = mongoose.model('term',termSchema,'term');

module.exports = Term;