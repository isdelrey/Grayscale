import {default as Log} from '../../services/log';
import actions_config from '../../../actions_config.js';
import {default as Catch} from '../../services/catch';
import Bluetooth from '../../services/bluetooth';

module.exports = {
    set: function(parameters) {
        return new Promise((r, j) => {
            Log("actions.lights.level.set", "OK");
            console.log("%j", parameters);
            Bluetooth.send(parameters.level, actions_config.devices[parameters.light]).then(() => {
                r("Done");
            }).catch((err) => {
                Catch(err);
                j(err);
            });
        });
    }
};