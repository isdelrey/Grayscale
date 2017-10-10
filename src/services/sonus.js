import {default as Sonus} from 'sonus';
import {default as GoogleSpeech} from '@google-cloud/speech';

/* Config */
import config from '../../config.js';


const speech = GoogleSpeech(config.google.speech.credentials);
const hotwords = config.sonus.hotwords;

module.exports = () => {
    let sonus = Sonus.init({ hotwords, language: config.sonus.language }, speech);
    Sonus.start(sonus);
    return sonus;
}