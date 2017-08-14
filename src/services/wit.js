/* Config */
let config = require('../../config.js');

/* Libraries */
import {Wit as _wit} from 'node-wit';

module.exports = class Wit {
    static enable() {
        this.client = new _wit({
            accessToken: config.wit.token,
        });
    }
    static interpret(text) {
        return new Promise((resolve, reject) => {
            this.client.message(text, {}).then((data) => {
                resolve(JSON.stringify(data));
            })
            .catch(() => {
                reject();
            });
        });
    }
};