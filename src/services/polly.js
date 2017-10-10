import {default as Log} from '../services/log';
import config from '../../config.js';
import {default as fs} from 'fs';

import {default as crypto} from 'crypto';

import {default as Aws} from 'aws-sdk';
Aws.config.update({accessKeyId: config.aws.polly.accessKeyId, secretAccessKey: config.aws.polly.secretAccessKey, region: config.aws.region});
let polly = new Aws.Polly();

module.exports = class Polly {
    static toSpeech(text, who) {
        let id = crypto.createHash('md5').update(text + "-" + who).digest('hex') + ".mp3";
        let path = 'store/' + id;
        Log("Polly.toSpeech", "Request");
        
        if(fs.existsSync(__dirname + "/../../" + path)) {
            Log("Polly.toSpeech", "In Cache");
            return Promise.resolve(path);
        }
        return new Promise((resolve, reject) => {
            var params = {
                OutputFormat: "mp3",
                Text: '<speak>' + text + '.</speak>',
                TextType: "ssml",
                VoiceId: who
                };
            polly.synthesizeSpeech(params, function(err, data) {
                if (err) {
                    Log("Polly.toSpeech", err);
                    reject();
                }
                else {
                    Log("Polly.toSpeech", "Got");
                    fs.writeFile(path, data.AudioStream, function(err) {
                        if(err) {
                            Log("Polly.toSpeech", err);
                            reject();
                        }
                        else
                            resolve(path);
                    });
                }
            });
        });
    }
};