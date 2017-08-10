/* Config */
let config = require('../config.js');

/* Libraries */
var lib = {};
lib.continousListener = require('pocketsphinx-continuous');
lib.fs = require('fs');

module.exports = class Listen {
    static setup() {
        this.continousListening = new lib.continousListener({
            setId: '1337',
            verbose: true
        });
        this.continousListening.on('data', function(data) {
            console.log("understood: " + data)
        });
    }
};