var flash = function () { }
var mainDivs = {};

flash.prototype.clearFlash = function (cname) {
    var d = new Date();
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + "; " + expires;
}
flash.prototype.getFlash = function () {
    var name = "flash-";
    var flash = [];
    var ca = document.cookie.split(';');

    console.log(ca);
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var str = c.substring(name.length + 5, c.length);
            str = JSON.parse(unescape(decodeURIComponent(str)));
            flash.push(str);
            this.show(str);
            this.clearFlash(c.substring(name.length + 5, 0));
        }
    }
    return flash;
}
flash.prototype.show = function (flash) {
    UIkit.notification({message: flash.msg, status: flash.type,timeout:1000})
}



var f = new flash();
var d = f.getFlash();
