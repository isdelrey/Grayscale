import {default as Log} from '../services/log';

module.exports = () => {
    Log("actions.undefined", "OK")
    return Promise.resolve(`I'm not human. <break time="1s"/>I can not do what I have not been taught.`);
};