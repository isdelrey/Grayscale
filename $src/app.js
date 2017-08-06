var Death = require('death');
let Orchestrator = require('./central/orchestrator.js');
var selfDeployment = require('./services/self-deployment.js');

console.log('Entry point reached');

/* Tunnels */
let tunnels = {};
tunnels.vnc = new Tunnel(80, 'Server for Github Websocket');
tunnels.ssh = new Tunnel(22, 'SSH');

/* On Exit */
let death = function(signal, err) {
    // (resolution of all promises (to close tunnels)) triggers exit
    var promises = [];
    for(var name in tunnels) {
        var tunnel = tunnels[name];
        promises.push(tunnel.closes());
    }
    Promise.all(promises).then(function() {
        console.log('Exit point reached');
        process.exit(0);
    });

    // destroy tunnels
    for(var name in tunnels) {
        var tunnel = tunnels[name];
        tunnel.destroy();
    }
};
Death(death);

/* Self-Deployment */
selfDeployment.setup(death);

/* Ready */
let orchestrator = new Orchestrator();
orchestrator.begin();
