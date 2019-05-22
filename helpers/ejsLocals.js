const Term = require('../models/term');
const dd = require('houssamdev-dd');

module.exports=async function(req, res, next) {
    let terms = await Term.find();
    res.dd = (data)=>{
        return dd( data, res, [expanded = false] )
    }
    res.locals.term = terms[terms.length-1];
    if(req.session.sideMenu!==undefined){
        res.locals.sideMenu = {
            hide:true
        };
    }else{
        res.locals.sideMenu = {
            hide:false
        };
    }
    if(req.session.login_user!=undefined){
        res.locals.Auth = {
            user:req.session.login_user,
            status:true,
            type:req.session.type
        };
    }else{
        res.locals.Auth = {
            status:false
        };
    }
    next();
};