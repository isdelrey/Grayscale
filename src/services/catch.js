import {default as Log} from './log';

module.exports = function(err) {
    Log("Promise rejected", err);
};