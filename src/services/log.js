let mode = 1; // 0: non-verbose, 1: verbose

module.exports = function(source, message) {
    let t = "" + source + ":  " + message;
    if(mode > 0)
        console.log(t);
};