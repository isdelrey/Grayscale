import {default as bluetooth} from 'bluetooth-serial-port';
const device = new bluetooth.BluetoothSerialPort();

module.exports = class Bluetooth {
    static send(what, address) {
            return new Promise((resolve, reject) => {
                device.findSerialPortChannel(address, function(channel){
                    console.log(channel);
                    device.connect(address, channel, function(err) {
                        if(err) {
                            reject(err);
                            return;
                        }

                        device.on('data', (buffer) => {
                            if(buffer.toString() == "OK")
                                resolve();
                            else
                                reject("No OK signal received");
                            device.close();
                            });

                            device.write(new Buffer(what, 'utf-8'), function() {});
                });
            });
        });
    }
    static device() {
        return device;
    }
};