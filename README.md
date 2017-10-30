# Grayscale
***Home Voice Assistant for Raspberry Pi*** [experimental] (ES6 + NodeJS - using SnowBoy)

## What is it?
Grayscale is a home assistant which interacts with users speaking (using Amazon Polly), listening (using Snowboy + Microsoft Speech API), understanding (using API.AI) and writing (using Telebot).
It is meant to be deployed in a Raspberry Pi 3/2 and will work out of the box - in the future.

## Why?
Current Home Assistants are built for the general public, not for developers. This one would be. Grayscale agnostically takes care of binding the user with a set of actions. Those actions need to be programmed and added to the folder ***actions***.

For instance, if we wanted our bluetooth-powered Arduino to turn on the lights, we could use the class ***bluetooth***, inside of **resources** in a new action. That new action would be placed inside the folder **actions** and would be found when your API.AI bot triggered it. See [grayscale.actions.lights.switch](https://github.com/ivosequeros/Grayscale/blob/master/src/actions/lights/switch.js) as an example.

## When will all this work?

Around December 2017. I am using Grayscale to power my room using Arduinos, bluetooth modules & some hard work.

I've promised myself to finish this :P
