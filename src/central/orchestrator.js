import {default as Log} from '../services/log';

import {default as Flux} from './flux';

module.exports = () => {
    Log("↑", "Orchestrator", "Started");
    Flux();
};