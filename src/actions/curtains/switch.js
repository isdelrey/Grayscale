import {default as Log} from '../../services/log';
import {default as Catch} from '../../services/catch';
import Bluetooth from '../../services/bluetooth';
import {default as Stream} from 'stream';

module.exports = {
    pull: function(parameters) {
        return new Promise((r, j) => {
            Log("actions.curtains.switch.pull", "OK - parameters: " + parameters);
            Bluetooth.send('1', '20:16:11:29:61:80').then(() => {
                r("done");
            }).catch(Catch);
        });
    },
    pullback: function(parameters) {
        return new Promise((r, j) => {
            Log("actions.curtains.switch.pullback", "OK - parameters: " + parameters);
            Bluetooth.send('1', '20:16:11:29:61:80').then(() => {
                r("done");
            }).catch(Catch);
        });
    }
};