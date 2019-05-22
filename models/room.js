const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('mongoose-simple-random');

const roomSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    row :{
        type: Number,
        required : true
    },
    col :{
        type: Number,
        required : true
    },
    building : {
        type:Schema.Types.ObjectId,
        ref:'building',
    },
    size:{
        type: Number,
        required : true
    }

}, { 
	timestamps: { 
		createdAt: 'create_at' ,
		updatedAt: 'update_at'
	}
});
roomSchema.plugin(random);
const Room = mongoose.model('room',roomSchema,'room');

module.exports = Room;
