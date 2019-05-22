const ExcelReader = require('node-excel-stream').ExcelReader;
const Building = require('../models/building');
const Room = require('../models/room');
module.exports = {

    index: async (req, res) => {
        res.render('page/buildingmanage');
    },
    viewBuilding: async (req, res) => {
        let build = await Building.find();
        return res.render('page/building', {
            buildingData: build
        });
    },
    edit: async (req, res) => {
        let buildId = req.params.id;
        let buildData = await Building.findById(buildId);
        return res.render('page/buildingDetail', {
            buildingData: buildData
        });
    },
    update: async (req, res) => {
        let buildId = req.body._id;
        let buildData = await Building.findById(buildId);

        buildData.building_id = req.body.building_id;
        buildData.building_name = req.body.building_name;

        await buildData.save();
        res.flash('<span uk-icon="icon: check"></span> บันทึกข้อมูลสำเร็จ','success');
        return res.redirect('/building/managebuilding');

    },
    delete: async (req, res) => {
        let buildId = req.params.id;
        let buildData = await Building.findById(buildId);
        res.flash('<span uk-icon="icon: check"></span> ลบสำเร็จ','success');
        await buildData.remove();
        await Room.remove({building: { $in: buildId }})
        return res.redirect('/building/managebuilding');
    },
    add:async(req, res)=>{
        let build =  new Building(req.body)
        await build.save();
        res.flash('<span uk-icon="icon: check"></span> เพิ่มสำเร็จ','success');
        res.redirect('/building/managebuilding');
    },
    addBuilding: async (req, res) => {
        console.log(req.body);
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            let buildingFile = file;
            if (fieldname == "building") {
                let reader = new ExcelReader(buildingFile, {
                    sheets: [{
                        name: 'Sheet1',
                        rows: {
                            headerRow: 1,
                            allowedHeaders: [{
                                name: 'building_id',
                                key: 'building_id'
                            }, {
                                name: 'building_name',
                                key: 'building_name'
                            }]
                        }
                    }]
                })

                reader.eachRow(async (rowData, rowNum, sheetSchema) => {
                    console.log(rowData);
                    let building = new Building(rowData);

                    await building.save();
                })
                    .then(() => {
                        console.log('done parsing : ' + fieldname);
                    });
            }
        })
        res.flash('<span uk-icon="icon: check"></span> อัพโหลดไฟล์สำเร็จ','success');
        res.redirect('/building/managebuilding');
    }
}