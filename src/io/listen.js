import {default as Log} from '../services/log';

/* Config */
let config = require('../../config.js');

/* Libraries */

module.exports = class Listen {
    static enable() {
        Log("↑", "Listen", "Enabled");
    }
};