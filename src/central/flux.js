import {default as Log} from '../services/log';

import {default as Listen} from '../io/listen';
import {default as Read} from '../io/read';
import {default as Interpreter} from '../services/wit';

import {default as Write} from '../io/write';
import {default as Speak} from '../io/speak';

let phases = {
    now: function() {
        (function() {
            Listen.now().then(phrase => {
                Interpreter.interpret(phrase).then(interpretation => {
                    Log("💬", "Read", "Interpretation is: " + interpretation);
                    phases.now();
                }).catch(function(err) {
                    Log("!", "Read", "Interpretation not possible: " + err);
                });
            });
        })();
    }
}

module.exports = () => {
    Log("↑", "Flux", "Started");
    phases.now();
    Listen.enable();
    Interpreter.enable();

    Read.bind('text', msg => {
        Log("⇄", "Read", "'" + msg.text + "' from " + msg.from.first_name);
        Interpreter.interpret(msg.text).then(interpretation => {
            Log("💬", "Read", "Interpretation is: " + interpretation);
        }).catch(function(err) {
            Log("!", "Read", "Interpretation not possible: " + err);
        });
    });
    Read.enable();
};