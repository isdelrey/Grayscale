/* Config */
import config from '../../config.js';

/* Libraries */
var lib = {};
import {default as _localtunnel} from 'localtunnel';


module.exports = class Tunnel {
    constructor(port, service) {
        this.connected = new Promise((resolve, reject) => {
            // establish tunnel
            this.tunnel = _localtunnel(port, { subdomain: config.tunnels.subdomain }, function(err, tunnel) {
                if(err) {
                    console.log(`Tunnel for ${service} ✕`);
                    reject();
                }
                else {
                    console.log(`Tunnel for ${service} ✓`)
                    console.log(tunnel.url);
                    resolve();
                }
            });

            // event handling
            this.tunnel.on('error', function(err) {
                    console.log(`Tunnel for ${service} ✕: ` + err);
            });
            this.tunnel.on('close', function() {
                console.log(`Tunnel for ${service} destroyed ✓`)
            });
        });
    }
    closes() {
        return new Promise((resolve, reject) => {
            this.tunnel.on('close', function() {
                resolve();
            });
            this.tunnel.on('error', function() {
                reject();
            });
        });
    }
    destroy() {
        this.tunnel.close();
    }
};