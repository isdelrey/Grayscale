import {default as Log} from '../services/log';

/* Config */
let config = require('../../config.js');

/* Libraries */
import {default as _fs} from 'fs';
import {default as _watson} from '../services/watson';
import {default as _polly} from '../services/polly';

var player = require('play-sound')({});

module.exports = class Speak {
    static out(file) {
        Log("🔊", "Speak", "Playing");
        return new Promise((resolve, reject) => {
            if(_fs.existsSync(file))
                player.play(file, function(err) {
                    if(err) {
                        Log('!', 'Speak', 'Player says ' + err);
                        reject();
                    }
                    else {
                        resolve();
                    }
                });
        });
    }
    static async say(text) {
        Log("🔊", "Speak", "Saying '" + text + "'");
        await ((config.speak.provider == 'watson') ? _watson : _polly).toSpeech(text);
        return this.out("store/last.mp3");
    }
};