import {default as Log} from '../services/log';
import config from '../../config.js';
import {default as Telegram} from '../services/telegram';

module.exports = class Write {
    static sayTo(to, text) {
        Telegram.sendMessage(to, text);
    }
    static say(text) {
        Write.sayTo(config.telegram.user_id, String(text).replace(/<[^>]+>/g,''));
    }
    static sayFromStream(stream) {
        Log("Write.sayFromStream", "Reading from stream");
        let promise;
        stream.on('data', text => {
            Log("Write.sayFromStream", text);
            if(typeof promise == 'undefined')
                promise = Write.say(text);
            else
                promise.then(() => {
                    promise = Write.say(text);
                });
        });
        stream.on('finished', text => {
            Log("Write.sayFromStream", "End");
        });
    }
};