const Building = require('../models/building');
const Room = require('../models/room');
module.exports = {

    index: async (req, res) => {
        let buildings = await Building.find();
        res.render('page/roommanage', {
            buildings: buildings
        });
    },
    add: async (req, res) => {

        console.log(req.body);

        let {
            name,
            row,
            col,
            building_id
        } = req.body;

        console.log("FRAME ............................................ " + name);

        if (name == null || row == null || col == null || building_id == null) {
            return res.flash('<span uk-icon="icon: check"></span> กรุณากรอกข้อมูลให้ครบ', 'success');
            return res.redirect('/room/manageroom');
        }

        let building = await Building.findById(building_id);

        let room = new Room({
            name: name,
            row: row,
            col: col,
            building: building._id,
            size: row * col
        })
        await room.save();
        res.flash('<span uk-icon="icon: check"></span> เพิ่มห้องสำเร็จ', 'success');
        res.redirect('/room/manageroom');
    },
    viewRoom: async (req, res) => {
        let room = await Room.find().populate('building').exec();
        let building = await Building.find();
        console.log(room);
        return res.render('page/room', {
            roomData: room,
            buildingData: building
        });
    },
    delete: async (req, res) => {
        let roomId = req.params.id;
        let roomData = await Room.findById(roomId);
        res.flash('<span uk-icon="icon: check"></span> ลบสำเร็จ', 'success');
        await roomData.remove();
        return res.redirect('/room/manageroom');
    },
    edit: async (req, res) => {
        let roomId = req.params.id;
        let roomData = await Room.findById(roomId);
        res.render('page/roomDetail', {
            roomData: roomData
        });
    },
    update: async (req, res) => {
        let roomId = req.body._id;
        let roomData = await Room.findById(roomId);

        roomData.building = req.body.building_id;
        roomData.name = req.body.name;
        roomData.col = req.body.col;
        roomData.row = req.body.row;
        await roomData.save();
        res.flash('<span uk-icon="icon: check"></span> บันทึกข้อมูลสำเร็จ', 'success');
        return res.redirect('/room/manageroom');

    },

    viewDatailRoom: async (req, res) => {
        let roomId = req.params.id;
        let roomData = await Room.findById(roomId);
        let buildings = await Building.find();
        res.render('page/roomDetail', {
            roomData: roomData,
            buildingData: buildings
        });
    },


}