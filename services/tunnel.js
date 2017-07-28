/* Config */
let config = require('../config.js');

/* Libraries */
var lib = {};
lib.localtunnel = require('localtunnel');


module.exports = class Tunnel {
    constructor(service, port) {
        // establish tunnel
        this.tunnel = lib.localtunnel(5900, { subdomain: config.tunnels.subdomain }, function(err, tunnel) {
            if(err)
                console.log('Tunnel (' + service + ') could not be established: ' + err);
            else
                console.log('Tunnel (' + service + ') established: ' + tunnel.url);
        });

        // event handling
        this.tunnel.on('error', function() {
                console.log('Tunnel error (' + service + '): ' + err);
        });
        this.tunnel.on('close', function() {
            console.log('Tunnel (' + service + ') destroyed');
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