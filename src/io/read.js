import {default as Log} from '../services/log';

import {default as Telegram} from '../services/telegram';
Telegram.start();

module.exports = class Read {
    static bind(type, handler) {
        Telegram.on(type, handler);
    }
};