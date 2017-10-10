import {default as Log} from '../services/log';
import config from '../../config.js';

import {default as _apiai} from 'apiai';

let app = _apiai(config.apiai.token);

module.exports = class Apiai {
    static interpret(text) {
        return new Promise((resolve, reject) => {
            let request = app.textRequest(text, {
                sessionId: (new Date).getTime() + Math.floor(Math.random() * 100)
            });
            
            request.on('response', function(response) {
                resolve(response);
            });
            
            request.on('error', function(error) {
                Log("Apiai.interpret", error);
                reject();
            });

            request.end();
        });
    }
};