import {default as Log} from '../services/log';

import {default as Listen} from '../io/listen';
import {default as Read} from '../io/read';
import {default as Interpreter} from '../services/wit';

import {default as Write} from '../io/write';
import {default as Speak} from '../io/speak';

module.exports = () => {
    Log("↑", "Flux", "Started");

    Listen.enable();
    Interpreter.enable();

    Read.bind('text', msg => {
        Log("⇄", "Read", "'" + msg.text + "' from " + msg.from.first_name);
        Interpreter.interpret(msg.text).then(interpretation => {
            Log("💬", "Read", "Interpretation is: " + interpretation);
            Speak.say(msg.text);
            Write.say(msg.from.id, "✓");
        }).catch(function(err) {
            Log("!", "Read", "Interpretation not possible: " + err);
        });
    });
    Read.enable();
};