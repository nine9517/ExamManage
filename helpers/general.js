Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

Date.prototype.toDateStr = function() {  
    var mm = this.getMonth() + 1;
    var dd = this.getDate();

    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
            ].join('-');
};

Date.prototype.toTimeStr = function() { 
    return this.getHours()+":"+this.getMinutes().pad(2);
};

Date.prototype.toDateThai = function() {  
    let thaiMonth = require('./date').month.thai;
    return this.getDate() + " " + thaiMonth[this.getMonth().toString()] + " " + (this.getFullYear()+543);
};

Number.ran = function(min,max) {
    return  Math.floor(Math.random() * (max - min) + min);
}