import {default as Catch} from './services/catch';
import {default as Log} from './services/log';/*
import {default as Listen} from './io/listen';*/
import {default as Speak} from './io/speak';
import {default as Read} from './io/read';
import {default as Write} from './io/write';
import Interpreter from './interpreter';

let Resolver = Speak;
/*
Listen.bind('hotword', (index, hotword) => {
    Resolver = Speak;
    Log("Orchestrator", "I understood '" + hotword + "'");
    Speak.ding();
});
Listen.bind('error', (err) => {
    if(typeof err.message != undefined) {
        Log("Orchestrator", "Listening error: " + err.message);
        Speak.say('Failure at listening<break time="1s"/><prosody volume="x-loud">' + err.message + '</prosody>');
    }
});
Listen.bind('final-result', (result) => {
    if(result != '') {
        Log("Orchestrator", "You said '" + result + "'");
        Interpreter.process(result.text).then(Interpreter.handleResponse(Resolver)).catch(Catch);
    }
    else
        Log("Orchestrator", "You didn't say anything");
});*/
Read.bind('text', (result) => {
    Resolver = Write;
    Log("Orchestrator", "You texted me '" + result.text + "'");
    Interpreter.process(result.text).then(Interpreter.handleResponse(Resolver)).catch(Catch);
});
Log("Orchestrator", "Ready");