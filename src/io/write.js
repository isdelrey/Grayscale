/* Config */
let config = require('../../config.js');

import {default as Telegram} from '../services/telegram';

module.exports = class Write {
    static warn(text) {
        Telegram.sendMessage(config.admin.user_id, "! " + text);
    }
    static report(text) {
        Telegram.sendMessage(config.admin.report_group_id, text);
    }
    static say(to, text) {
        Telegram.sendMessage(to, text);
    }

};