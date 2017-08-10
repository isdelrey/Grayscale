/* Config */
let config = require('../../config.js');

var exec = require('child_process').exec;

module.exports = class SelfDeployment {
    static bind(hub) {
            hub.server.post('/deployment', function(req, res) {
                    res.send('OK');
                    console.log('Redeployment request');
                    if (process.platform === 'win32') {
                        console.log('Cannot redeploy in Windows');
                        return;
                    }
                    exec('../../redeploy.sh', function(error, stdout, stderror) {
                        if(error) {
                            console.log(error);
                            return;
                        }
                        console.log('Redeployment prompted');
                        console.log(stdout);
                    });
            });
    }
};