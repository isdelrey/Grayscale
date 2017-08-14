import {default as Log} from '../services/log';

import {default as Telegram} from '../services/telegram';

module.exports = class Read {
    static enable() {
        Log("↑", "Read", "Enabled");
        Telegram.start();
    }
    static bind(type, handler) {
        Telegram.on(type, handler);
    }
};