/*import SelfDeployment from './services/self-deployment';
import Hub from './central/hub';

Hub.enable().then(function() {
    SelfDeployment.bind(Hub);
    Hub.plug();
});*/

/*
import Shutdown from './events/shutdown';

Shutdown.bind();
Shutdown.do(() => {
    console.log("ok");
    return Promise.resolve();
});
Shutdown.do(() => {
    console.log("ok!");
    return Promise.resolve();
});
setTimeout(() => {
    console.log('Timeout');
}, 3000000);
*/