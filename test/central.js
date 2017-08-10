import test from 'ava';
import http from 'ava-http';

let config = require('../config.js');

import SelfDeployment from '../$build/services/self-deployment';
import Hub from '../$build/central/hub';

test.serial('enable hub + self-deployment webhook setup', async t => {
    await Hub.enable();
    SelfDeployment.bind(Hub);
    Hub.plug();
    t.pass();
});

test.serial('local git webhook access', async t => {
    const res = await http.post('http://localhost/deployment');
    t.is(res, "OK");
});

test.serial('global git webhook access', async t => {
    const res = await http.post('https://' + config.tunnels.subdomain + '.localtunnel.me/deployment');
    t.is(res, "OK");
});

test.serial('disable hub', async t => {
    await Hub.disable();
    t.pass();
});