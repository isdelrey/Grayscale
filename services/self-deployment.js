/* Libraries */
var lib = {};
lib.gad = require('git-auto-deploy');
lib.app = require('express')();

module.exports = class SelfDeployment {
    constructor() {
        lib.app.get('/deployment', function(req, res) {
            if(req.body.secret == config.self_deployment.secret)
                gad.deploy();
        });

        lib.app.listen(80, function() {
            console.log('Server ready');
        });
    }
};