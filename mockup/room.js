const faker = require('faker/locale/en');
const Building = require('../models/building');

async function random(Model) {
    let num = await Model.countDocuments();
    let numRan =  Math.floor(Math.random() * num);
    let ran = await Model.findOne().skip(numRan).exec();
    // console.log(num);
    return ran;
}

module.exports = async ()=> {
    let building = await random(Building);
    // console.log(building);
    
    let id =  Number.ran(1,100).pad(3);
    let row =Number.ran(1,10);
    let col = Number.ran(1,10);
    let size = row * col;
    return Promise.resolve({
        name : building.building_name+"-"+id,
        row :row,
        col :col,
        building : building._id,
        size:size
    });

}