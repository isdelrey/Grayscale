import {default as Log} from '../../services/log';
import {default as Catch} from '../../services/catch';
import Bluetooth from '../../services/bluetooth';
import {default as Stream} from 'stream';

module.exports = {
    list: function() {
        return new Promise((r, j) => {
            Log("actions.devices.available.on", "OK");
            let stream = new Stream.Readable;
            stream._read = function () {};
            r(stream);
            stream.push("Searching");
            let device = Bluetooth.device();
            device.on('found', (address, name) => {
                Log("actions.devices.available.on", name + " " + address);
                stream.push(name + '<break time="1s"/> with address ' + address.replace(/:/g,' ') + '<break time="2s"/>');
            }).on('finished', () => {
                stream.push(null);
            }).inquire();
        });
    }
};