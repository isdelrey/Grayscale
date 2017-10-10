import {default as Catch} from './services/catch';
import {default as Log} from './services/log';
import {default as Apiai} from './services/apiai';
import {default as Speak} from './io/speak';
import {default as Stream} from 'stream';
import {default as fs} from 'fs';

let Interpreter = {};

Interpreter.findAction = (left, last) => {
    let element = left[0];
    Log("Interpreter.findAction", last + ":" + typeof last + " + " + element);
    if(typeof last == 'function') {
        Log("Interpreter.findAction", "found");
        return last;
    }
    if(typeof last == 'object') {
        Log("Interpreter.findAction", "object");
        if(last.hasOwnProperty(element))
            return Interpreter.findAction(left.slice(1), last[element]);
        else
            return null;
    }
    if(fs.existsSync(last)) {
        Log("Interpreter.findAction", "directory");
        last += "/" + element;
        return Interpreter.findAction(left.slice(1), last);
    }
    if(fs.existsSync(last + ".js")) {
        let action = require(last + ".js");
        Log("Interpreter.findAction", "file: " + last + ".js");
        return Interpreter.findAction(left.slice(1), typeof element == 'undefined' ? action : action[element]);
    }

    Log("Interpreter.findAction", "'" + last + "' not found");
    return null;
};
Interpreter.handleResponse = Resolver => {
    Log("Interpreter.handleResponse", "Action Handler Issued")
    return response => {
        console.log("%j", response);
        Log("Interpreter.handleResponse", "Action Handler OK");
        if(response instanceof Stream.Readable) {
            Resolver.sayFromStream(response);
        }
        else
            if(typeof response == 'string' || response instanceof String)
                Resolver.say(response);
            else
                Log("Interpreter.handleResponse", "action does not return usable response")
    }
};

Interpreter.trigger = interpretation => {
    let actionId = interpretation.result.hasOwnProperty('action') ? interpretation.result.action.split('.').slice(1) : ['input', 'unknown'];
    Log("Interpreter.trigger", "Identified action '" + interpretation.result.action + "'");
    let action = Interpreter.findAction(actionId, __dirname + '/actions');
    if(typeof action == 'function') {
        Log("Interpreter.trigger", "Triggering");
        return action(interpretation.result.parameters);
    }
    else {
        Log("Interpreter.trigger", "No triggable action");
        return Promise.reject();
    }
};
Interpreter.process = result => {
    return new Promise((r, j) => {
        Apiai.interpret(result).then(interpretation => {
            Log("Interpreter.process", "OK");
            Interpreter.trigger(interpretation).then((response) => {
                r(response);
            });
        }).catch(function(err) {
            Log("Interpreter.process", "Interpretation not possible: " + err);
            j();
        });
    });
};

module.exports = Interpreter;