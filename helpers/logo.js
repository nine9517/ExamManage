

const CFonts = require('cfonts');
module.exports = ()=>{
    CFonts.say('Exam', {
        font: 'simple',
        align: 'center',
        colors: ['yellow'],        
        background: 'transparent',
        letterSpacing: 1,  
        lineHeight: 0,
        space: false,       
        maxLength: '0',      
    });
    CFonts.say('Manage', {
        font: 'simple',
        align: 'center',
        colors: ['blue'],        
        background: 'transparent',
        letterSpacing: 1,  
        lineHeight: 0,
        space: false,       
        maxLength: '0',      
    });
}