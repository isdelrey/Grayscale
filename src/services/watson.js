/* Config */
let config = require('../../config.js');

/* Libraries */
var lib = {};
lib.fs = require('fs');

lib.watson = {};
lib.watson.TextToSpeech = require('watson-developer-cloud/text-to-speech/v1');
lib.watson.SpeechToText = require('watson-developer-cloud/speech-to-text/v1');
if(config.watson.textToSpeech.username != null)
    lib.watson.textToSpeech = new lib.watson.TextToSpeech({
        username: config.watson.textToSpeech.username,
        password: config.watson.textToSpeech.password
    });
lib.watson.speechToText = new lib.watson.SpeechToText({
    username: config.watson.speechToText.username,
    password: config.watson.speechToText.password
});

module.exports = class Watson {
    static toSpeech(text, who) {
        if(config.watson.textToSpeech.username == null) {
            console.log("Watson credentials not specified");
            return;
        }
        return new Promise((resolve, reject) => {
            var parameters = {
                text: text,
                voice: who, 
                accept: 'audio/mp3'
            };
            var stream = lib.watson.textToSpeech.synthesize(parameters).pipe(lib.fs.createWriteStream('store/last.mp3'));
            stream.on('finish', function() {
                resolve();
            });
        });
    }
    static toText(audio) {
        return new Promise((resolve, reject) => {
            let all = '';
            let textStream = audio.pipe(lib.watson.speechToText.createRecognizeStream({ content_type: 'audio/l16; rate=20000', model: 'en-GB_NarrowbandModel' }));
            textStream.on('data', function(piece) {
                all += String(piece);
                console.log(String(piece));
            });
            textStream.on('error', function(err) {
                console.log(err);
                reject(err);
            });
            textStream.on('end', function() {
                resolve(all);
            });
        });
    }
};