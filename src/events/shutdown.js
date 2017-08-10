import On from './on';

import _death from 'death';

module.exports = class Shutdown extends On {
    static bind() {
        let self = this;
        _death(function() {
            self.trigger();
        });
    }
};