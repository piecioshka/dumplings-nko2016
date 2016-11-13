'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/../../public'));

http.listen(app.get('port'), function () {
    console.log('Node app is running at localhost:' + app.get('port'))
});

require('./socket')(http);
