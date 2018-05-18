const Alexa = require('alexa-sdk');
const twitchClient = require('./twitch-client');
const BROADCASTER_ID = '';
const AUTH_KEY = '';

var handlers = {
  'LaunchRequest': function() {
    console.log('launch request');
    this.emit(":tell", 'Welcome!');
  },
  'ClipIntent': function() {
    console.log('ClipIntent invoked');
    twitchClient.clip(BROADCASTER_ID, AUTH_KEY, function(clipUrl, editUrl) {
      console.log("Clip URL: " + clipUrl);
      console.log("Edit URL: " + editUrl);
    });
    this.emit(":tell", 'Taking a clip.');
  },
  'Unhandled': function() {
    console.log('unhandled');
    this.emit(":tell", 'Unhandled!');
  },
};

const APP_ID = '';

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};