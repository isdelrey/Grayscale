/* Libraries */
var lib = {};
lib.gad = require('git-auto-deploy');
lib.express = require('express');
lib.app = lib.express();

lib.app.configure(function(){
  lib.app.use(lib.express.bodyParser());
  lib.app.use(lib.app.router);
});

module.exports = class SelfDeployment {
    constructor() {
        // listen for webhook
        lib.app.post('/deployment', function(req, res) {
            if(req.body.secret == config.self_deployment.secret)
                gad.deploy();
        });

        lib.app.listen(80, function() {
            console.log('Server ready');
        });
    }
};