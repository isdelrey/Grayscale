let Tunnel = require('./services/tunnel.js');

module.exports = class Hub {
    static setup() {
        /* Tunnels */
        this.tunnels = {};
        this.tunnels.vnc = new Tunnel(80, 'Server for Github Websocket');
        this.tunnels.ssh = new Tunnel(22, 'SSH');
    }
};