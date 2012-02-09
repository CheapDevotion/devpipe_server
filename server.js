/*jslint node: true, forin: true, sloppy: true, maxerr: 50, indent: 4 */
var config  = require('./config.js'),
    express = require('express'),
    storage = require('alfred'),
    app     = express.createServer(),
    io      = require('socket.io').listen(1001);

require('./lib/string');

// Configure app and sockets
app.use(express.bodyParser());
io.configure(function () {
    io.set('transports', ['jsonp-polling']);
});

// Return a list of all projects
app.post('/projects/:project', function (req, res) {
    var i;
    for (i in req.body) {
        io.sockets.emit('pipe', {
            project: req.params.project.capitalize().replace(/_/g, " "),
            message: JSON.parse(req.body[i])
        });
        res.send('status: ok');
    }
});

app.listen(1000);