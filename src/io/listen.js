import {default as Log} from '../services/log';

let config = require('../../config.js');

import {default as Sonus} from '../services/sonus';
let sonus = Sonus();

module.exports = class Listen {
    static bind(on, what) {
        sonus.on(on, what);
    }
};