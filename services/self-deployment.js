/* Libraries */
var lib = {};
lib.gad = require('git-auto-deploy');
lib.app = require('express')();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
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