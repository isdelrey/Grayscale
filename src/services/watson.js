/* Config */
let config = require('../../config.js');

/* Libraries */
var lib = {};
lib.fs = require('fs');

lib.watson = {};
lib.watson.TextToSpeech = require('watson-developer-cloud/text-to-speech/v1');
lib.watson.textToSpeech = new lib.watson.TextToSpeech({
            username: config.watson.textToSpeech.username,
            password: config.watson.textToSpeech.password
});

module.exports = class Watson {
    toSpeech(text) {
        return new Promise((resolve, reject) => {
            var parameters = {
                text: text,
                voice: config.watson.textToSpeech.voice, 
                accept: 'audio/mp3'
            };
            var stream = lib.watson.textToSpeech.synthesize(parameters).pipe(lib.fs.createWriteStream('store/last.mp3'));
            stream.on('finish', function() {
                resolve();
            });
        });
    }
};