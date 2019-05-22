module.exports = function (req,res) {
    // backURL=req.header('Referer') || '/';
    let hide = req.params.hide;
    if(hide=="no"){
        delete req.session.sideMenu;
    }else{
        req.session.sideMenu = true;
    }
    res.send("true");
    // return res.redirect(backURL);
}