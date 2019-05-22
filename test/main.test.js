const mongoose = require('mongoose');
const chalk = require('chalk');
const Logo = require('../helpers/logo');
mongoose.Promise = global.Promise;
let Collection = 'exammanage_test';
const config = require('../configuration/app.json');
mongoose.connect('mongodb://'+config.DB_HOST+':'+config.DB_PORT+'/'+Collection, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
require('../helpers/general');

before((done) => {
    Logo();
    mongoose.connection
    .once('open', () => {
        console.log('  Connected MongoDB!')
        console.log(chalk.green('    ✓ ')+chalk.gray('Collection => '+Collection))
        done();
    })
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
})
after((done) => {
    mongoose.connection.db.dropDatabase(() => {
        console.log("  Clear database!");
        
        done();
    });
});
