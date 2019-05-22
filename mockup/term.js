const faker = require('faker/locale/en');

module.exports = ()=> {
    let termNo =  Number.ran(1,3);
    let date = new Date();
    let start = new Date().setHours(date.getHours()+Number.ran(1,2));
    let end = new Date().setHours(date.getHours()+Number.ran(3,6));
    return {
        termNo :termNo,
        year :date.getFullYear(),
        start:start,
        end:end
    }

}