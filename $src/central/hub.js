/* Config */
import config from '../../$config.js';

import Tunnel from '../services/tunnel.js';

/* Libraries */
import {default as _express} from 'express';
import {default as _bodyParser} from 'body-parser';

module.exports = class Hub {
    static enable() {
        let promises = [];

        /* Tunnels */
        this.tunnels = [];
        for(let service of config.tunnels.services) {
            let tunnel = new Tunnel(service.port, service.name);
            promises.push(tunnel.connected);
            this.tunnels.push(tunnel);
        }


        /* Server */
        this.server = _express();
        this.server.use(_bodyParser.json());

        return Promise.all(promises);
    }
    static plug() {
        this.listening = this.server.listen(80, function() {
        });
    }
    static disable() {
        let promises = [];

        /* Tunnels */
        for(let tunnel of this.tunnels)
            promises.push(tunnel.destroy());

        /* Server */
        var listening = this.listening;
        promises.push(new Promise((resolve, reject) => {
            listening.close(() => {
                resolve();
            });
        }));

        return Promise.all(promises);
    }

};