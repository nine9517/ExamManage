
const Logo = require('./logo');
const chalk = require('chalk');

module.exports = (http)=>{
    http.startServer = function (port) {
        console.log(" ")
        Logo();
        this.listen(port, ()=> {
            console.log(" ")
            console.log(chalk.yellow("Exam ")+chalk.blue ("Manage")+chalk.gray(" Server is running on port "+port+" at "+new Date()));
        });
    }
}