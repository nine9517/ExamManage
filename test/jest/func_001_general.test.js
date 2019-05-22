const bcrypt = require('bcryptjs');
const chalk = require('chalk');
require('../../helpers/general');

test('Test function pad(3) ', async function () {
    let num = 9;
    let result = num.pad(3);
    expect(result=='009').toBe(true);
});

test('Test function ran(1,10) ', async function () {
    let result = Number.ran(1,10);
    expect(result>=1 && result<=10).toBe(true);
});

test('Test function toDateStr() ', async function () {
    let date = new Date(1998, 5, 5);
    let result = date.toDateStr();
    expect(result=='1998-06-05').toBe(true);
});

test('Test function toDateThai()', async function () {
    let date = new Date(1998, 5, 5);
    let result = date.toDateThai();
    expect(result=='5 มิถุนายน 2541').toBe(true);
});

test('Test function toTimeStr() ', async function () {
    let date = new Date(1998, 5, 5,10, 33, 30, 0);
    let result = date.toTimeStr();
    expect(result=='10:33').toBe(true);
});

test('Test function bcrypt password ', async function () {
    let password = "Test123";
    let salt = await bcrypt.genSalt(10);
    let passwordH = await bcrypt.hash(password, salt);
    
    expect(await bcrypt.compare(password, passwordH)).toBe(true);
});