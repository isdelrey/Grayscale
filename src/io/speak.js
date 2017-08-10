/* Libraries */
var lib = {};
lib.fs = require('fs');
lib.player = player = require('play-sound')(opts = {});

module.exports = class Speak {
    static out(file) {
        return new Promise((resolve, reject) => {
            if(lib.fs.existsSync(file))
                lib.player.play(file, function(err) {
                    if(err) {
                        console.log('(!) Player:' + err);
                        reject();
                    }
                    else {
                        resolve();
                    }
                });
        });
    }
};