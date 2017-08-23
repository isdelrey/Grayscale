import {default as Log} from '../services/log';

/* Config */
let config = require('../../config.js');

/* Libraries */
import {default as _mic} from 'mic';
import {default as _fs} from 'fs';
var player = require('play-sound')({});

import {default as Watson} from '../services/watson';
import {default as Speak} from './speak';

module.exports = class Listen {
    static enable() {
        Log("↑", "Listen", "Enabled");
    }
    static now() {
        return new Promise((resolve, reject) => {
            let stopped = false;
            let process = this.process;
            Speak.say("Now", "Brian").then(function(err) {
                Log("🔊", "Listen", "Now");
                if(err) {
                    Log('!', 'Speak', 'Player says ' + err);
                    return;
                }

                let micInstance = _mic({ 'rate': '20000', 'device':'plughw:0,0', 'debug': false, 'exitOnSilence': 8 });
                let micInputStream = micInstance.getAudioStream();

                let stopRecording = () => {
                    if(!stopped) {
                        stopped = true;
                        micInstance.stop()
                    }
                };
                setTimeout(stopRecording, 150000);
                micInputStream.on('silence', stopRecording);
                micInputStream.on('end', function() {
                    Log("🔊", "Listen", "End Recording");
                });   
                micInstance.start();
                process(micInputStream).then((phrase) => {
                    Speak.say("Ok", "Brian");
                    resolve(phrase);
                });
            });
        });
    }
    static process(audio) {
        Log("🔊", "Listen", "Processing");
        return Watson.toText(audio);
    }
};