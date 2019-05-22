const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('mongoose-simple-random');


const buildingSchema = new Schema({

    building_id: {
        type: String,
        required: true
    },
    building_name: {
        type: String,
        required: true
    },

}, {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'update_at'
        }
    });
buildingSchema.plugin(random);
const Building = mongoose.model('building', buildingSchema, 'building');


module.exports = Building;