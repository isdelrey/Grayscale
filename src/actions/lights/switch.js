import {default as Log} from '../../services/log';
import actions_config from '../../../actions_config.js';
import {default as Catch} from '../../services/catch';
import Bluetooth from '../../services/bluetooth';

module.exports = {
    on: function(parameters) {
        return new Promise((r, j) => {
            Log("actions.lights.switch.off", "OK");
            console.log("%j", parameters);
            Bluetooth.send('255', actions_config.devices[parameters.light]).then(() => {
                r("done");
            }).catch((err) => {
                Catch(err);
                j(err);
            });
        });
    },
    off: function(parameters) {
        return new Promise((r, j) => {
            Log("actions.lights.switch.off", "OK");
            console.log("%j", parameters);
            Bluetooth.send('0', actions_config.devices[parameters.light]).then(() => {
                r("Done");
            }).catch((err) => {
                Catch(err);
                j(err);
            });
        });
    }
};