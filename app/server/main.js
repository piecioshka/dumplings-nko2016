'use strict';

var express = require('express');
var app = express();

// app.set('port', (process.env.PORT || 5000));
app.set('port', 5124);
app.use(express.static(__dirname + '/../../public'));

var server = app.listen(app.get('port'), function () {
    console.log('Node app is running at localhost:' + app.get('port'))
});

require('./socket')(server);
