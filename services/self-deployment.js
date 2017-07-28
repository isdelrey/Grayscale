/* Config */
let config = require('../config.js');

/* Libraries */
var lib = {};
lib.gad = require('git-auto-deploy');
lib.express = require('express');
lib.app = lib.express();
lib.bodyParser = require('body-parser');

lib.app.use(lib.bodyParser.json());

module.exports = class SelfDeployment {
    constructor() {
        // listen for webhook
        lib.app.post('/deployment', function(req, res) {
            console.log('Deployment notice');
            if(req.body.secret == config.self_deployment.secret) {
                console.log('Deployment notice verified');
                console.log('Self-Deploying...');
                // deploy
                gad.deploy();
            }
        });

        lib.app.listen(80, function() {
            console.log('Server ready');
        });
    }
};