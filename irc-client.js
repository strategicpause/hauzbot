var tmi = require("tmi.js");

function TwitchBot(username, password, channel) {
    var options = {
        options: {
            debug: false
        },
        connection: {
            reconnect: true
        },
        identity: {
            username: username,
            password: password
        },
        channels: [channel]
    };
    this.client = new tmi.client(options);
    this.client.connect();
}

TwitchBot.prototype.message = function(channel, message) {
    this.client.say(channel, message).then(function(data) {
        console.log(data);
    }).catch(function(err) {
        console.log(err);
    });
};

TwitchBot.prototype.whisper = function(username, message) {
    this.client.whisper(username, message);
}

module.exports = TwitchBot;