/* Config */
import config from '../../config.js';

/* Libraries */
import {default as Telegram} from 'telebot';

module.exports = new Telegram(config.telegram.opts);