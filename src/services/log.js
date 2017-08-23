import {default as Write} from '../io/write';

let mode = 1; // 0: non-verbose, 1: verbose, 2: verbose (+ through telegram group)

module.exports = function(type, source, message) {
    let t = type + "  [" + source + "]  " + message;
    if(mode > 0)
        console.log(t);
    if(mode > 1)
        Write.report(t);
};