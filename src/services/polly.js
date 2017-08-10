/* Config */
let config = require('../config.js');

/* Libraries */
var lib = {};
lib.fs = require('fs');
lib.aws = {};
lib.aws.sdk = require('aws-sdk');
lib.aws.sdk.config.update({accessKeyId: config.aws.polly.accessKeyId, secretAccessKey: config.aws.polly.secretAccessKey, region: config.aws.region});
lib.aws.polly = new lib.aws.sdk.Polly();

module.exports = class Polly {
    toSpeech(text) {
        return new Promise((resolve, reject) => {
            var params = {
                OutputFormat: "mp3",
                SampleRate: "8000",
                Text: text,
                TextType: "text",
                VoiceId: "Brian"
                };
            lib.aws.polly.synthesizeSpeech(params, function(err, data) {
                if (err) {
                    console.log('(!) Polly: ' + err, err.stack);
                    reject();
                }
                else {
                    lib.fs.writeFile('output/audio/last.mp3', data.AudioStream, function() {
                        resolve();
                    });
                }
            });
        });
    }
};