var Death = require('death');
let Orchestrator = require('./orchestrator.js');
let Tunnel = require('./services/tunnel.js');

/* Tunnels */
let tunnels = {};
tunnels.vnc = new Tunnel(80, 'Server for Github Websocket');

/* On Exit */
Death(function(signal, err) {
    // (resolution of all promises (to close tunnels)) triggers exit
    var promises = [];
    for(var name in tunnels) {
        var tunnel = tunnels[name];
        promises.push(tunnel.closes());
    }
    Promise.all(promises).then(function() {
        process.exit(0);
    });

    // destroy tunnels
    for(var name in tunnels) {
        var tunnel = tunnels[name];
        tunnel.destroy();
    }
});

/* Self-Deployment */
var SelfDeployment = require('./services/self-deployment.js');
var selfDeployment = new SelfDeployment();

/* Ready */
let orchestrator = new Orchestrator();
orchestrator.begin();
