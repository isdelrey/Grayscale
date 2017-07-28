//let Voice = require('./interaction/voice.js');
//let Ear = require('./interaction/ear.js');

let Watson = require('./services/watson.js');
let Polly = require('./services/polly.js');
let Audio = require('./io/audio.js');

module.exports = function() {
    this.begin = function() {
        console.log('Orchestrator ready');
        //let voice = new Voice();
        //let watson = new Watson();
        let polly = new Polly();
        polly.toSpeech("Curtains are now being opened. Good morning!").then(function() {
            Audio.out("output/audio/last.mp3");
        });
        /*watson.toSpeech("Hallo, Ich bin deutscher und ich mag männer").then(function() {
            Audio.out("output/audio/last.mp3");
        });*/
    };
};