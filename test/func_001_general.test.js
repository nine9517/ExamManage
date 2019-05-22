
const assert = require('assert');
const chalk = require('chalk');
const bcrypt = require('bcryptjs');


describe('Testing General function!', () => {
    after(()=> { 
        console.log('  End Testing General function!'); 
    });
    afterEach((done) => {
        console.log(global.value);
        done();
      });
    it('Test function pad(3) ', (done) => {
       let num = 9;
       let result = num.pad(3);
       global.value = chalk.white("       |---> "+num+" => "+result)
       if(result=='009'){
        done();
       }
        
    });

    it('Test function ran(1,10) ', (done) => {
        let result = Number.ran(1,10);
        global.value = chalk.white("       |---> Number.ran(1,10) => "+result)
        if(result>=1 && result<=10){
         done();
        }
         
     });

    it('Test function toDateStr() ', (done) => {
        let date = new Date(1998, 5, 5);
        let result = date.toDateStr();
        global.value = chalk.white("       |---> new Date(1998, 5, 5) => "+result)
        if(result=='1998-06-05'){
         done();
        }
     });

     it('Test function toDateThai() ', (done) => {
        let date = new Date(1998, 5, 5);
        let result = date.toDateThai();
        global.value = chalk.white("       |---> new Date(1998, 5, 5) => "+result)
        if(result=='5 มิถุนายน 2541'){
         done();
        }
     });

     it('Test function toTimeStr() ', (done) => {
        let date = new Date(1998, 5, 5,10, 33, 30, 0);
        let result = date.toTimeStr();
        global.value = chalk.white("       |---> new Date(1998, 5, 5,10, 33, 30, 0) => "+result)
        if(result=='10:33'){
         done();
        }
     });

     it('Test function bcrypt password ', (done) => {
        let password = "Test123";
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                global.value = chalk.white("       |---> "+password+" => "+hash)
                bcrypt.compare(password, hash, (err, res) => {
                    if(res){
                        done();
                    }
                });
            });
        });
     });

});
