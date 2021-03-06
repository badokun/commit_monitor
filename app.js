var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    rest = require('restler');


var express = require('express');
var bodyParser = require('body-parser');


var buildUrl = function (settings) {
    var url = 'https://slack.com/api/chat.postMessage?' +
        'token=' + settings.authToken +
        '&channel=' + settings.channelId +
        '&text=:scream:' + settings.text +
        '&username=Git Master';
    console.log(url);
    return url;
};

fs = require('fs');
var token = fs.readFileSync('authToken.txt', 'utf8');



var app = express();

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log(req.body); // populated!
    
    var settings = {
        text : req.body.changeset.author + ' pushed to ' + req.body.changeset.branches + ' with comment [' +
			req.body.changeset.comment + '] http://gitlab.trad.tradestation.com/insight/sometaro/commit/' + req.body.changeset.csid,
//		JSON.stringify(req.body),
        //text : req.body.changeset.comment,
        channelId : "G02EQ8WRX",
        authToken: token
    }

    
rest.get(buildUrl(settings)).on('complete', function (result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            console.log(result);
        }
    });

    next();
});

app.post('/api', function (req, res) {
    res.status(200).end();
});


//var port = process.env.PORT;
var port = 3000;

var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
});


