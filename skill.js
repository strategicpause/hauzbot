const Alexa = require('alexa-sdk');
const twitchClient = require('./twitch-client');
const TwitchBot = require('./irc-client');
const ircClient = new TwitchBot(process.env.USERNAME, process.env.PASSWORD, process.env.CHANNEL);

var handlers = {
  'LaunchRequest': function() {
    console.log('launch request');
    this.emit(":ask", '');
  },
  'ClipIntent': function() {
    console.log('ClipIntent invoked');
    twitchClient.clip(process.env.BROADCASTER_ID, process.env.AUTH_KEY, function(clipUrl, editUrl) {
      ircClient.message(process.env.CHANNEL, clipUrl);
      ircClient.whisper(process.env.OWNER, "Edit URL: " + editUrl);
    });
    this.emit(":tell", 'Taking a clip.');
  },
  'Unhandled': function() {
    console.log('unhandled');
    this.emit(":tell", 'Unhandled!');
  },
};

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = process.env.APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
