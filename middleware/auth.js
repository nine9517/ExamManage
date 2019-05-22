module.exports = {
    login: (req,res,next)=>{
        if(req.session.login_user==undefined){
            res.redirect('/login');
        }else{
            next();
        }
        
        
    },
    notLogin: (req,res,next)=>{
        if(req.session.login_user!=undefined){
            res.redirect('/manageuser');
        }else{
            next();
        }
        
    }
};