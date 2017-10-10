import {default as Log} from '../services/log';
import config from '../../config.js';
import {default as _fs} from 'fs';
import {default as Polly} from '../services/polly';
import {default as Player_} from 'play-sound';
let player = Player_({});

module.exports = class Speak {
    static ding() {
        this.out('resources/ding.wav');
    }
    static out(file) {
        Log("Speak.out", "Playing");
        return new Promise((resolve, reject) => {
            if(_fs.existsSync(file))
                player.play(file, function(err) {
                    if(err) {
                        Log('Speak.out', 'Player says ' + err);
                        reject();
                    }
                    else {
                        resolve();
                    }
                });
        });
    }
    static async say(text, who = "Brian") {
        Log("Speak.say", "Saying '" + text + "'");
        let path = await Polly.toSpeech(text, who);
        return this.out(path);
    }
    static sayFromStream(stream, who = "Brian") {
        Log("Speak.sayFromStream", "Reading from stream");
        let promise;
        stream.on('data', text => {
            Log("Speak.sayFromStream", text);
            if(typeof promise == 'undefined')
                promise = Speak.say(text);
            else
                promise.then(() => {
                    promise = Speak.say(text);
                });
        });
        stream.on('finished', text => {
            Log("Speak.sayFromStream", "End");
        });
    }
};