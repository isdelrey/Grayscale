var Death = require('death');
let Orchestrator = require('./orchestrator.js');
let Tunnel = require('./services/tunnel.js');

console.log('Entry point reached');

/* Tunnels */
let tunnels = {};
tunnels.vnc = new Tunnel(80, 'Server for Github Websocket');

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
var SelfDeployment = require('./services/self-deployment.js');
var selfDeployment = new SelfDeployment(death);

/* Ready */
let orchestrator = new Orchestrator();
orchestrator.begin();
