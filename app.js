var application_root = __dirname,
    express = require("express"),
    path = require("path");

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log(req.body); // populated!
    next();
});

app.post('/api', function (req, res) {
    var name = req.body.name,
        color = req.body.color;
    res.send(200);
    // ...
});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});


