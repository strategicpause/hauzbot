const express = require('express');
const bodyParser = require('body-parser');
const skill = require('./skill');

const DEBUG = false;

const app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
    console.log("Received HTTP request.");
    res.json({response: "Your skill endpoint is up and running."});
});

app.post('/', function(req, res) {
    if (DEBUG) {
        console.log("######################## Request from Alexa ########################");
        console.log(req.body);
        console.log("####################################################################");
    }
    skill.handler(req.body, context(res));
});

const context = function(res) {
    var ctx = {
        "clientContext": {
            "env": {}
        }
    };
    ctx.done = function(error, result) {
        if (DEBUG) {
            console.log('ctx.done');
            console.log(error);
            console.log(result);
        }
        res.json(result);
    };
    ctx.succeed = function(result) {
        if (DEBUG) {
            console.log('ctx.succeed');
            console.log(result);
        }
        res.json(result);
    };
    ctx.fail = function(error) {
        if (DEBUG) {
            console.log('ctx.fail');
            console.log(error);
        }
    };

    return ctx;
}

app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function() {
    console.log('Skill endpoint started');
});
