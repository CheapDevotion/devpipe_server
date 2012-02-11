/*jslint node: true, forin: true, sloppy: true, maxerr: 50, indent: 4 */
var config  = require('./config.js'),
    express = require('express'),
    storage = require('alfred'),
    fs      = require('fs'),
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
    var data, 
        i;
    for (i in req.body) {
        data = {
            project: req.params.project.capitalize().replace(/_/g, " "),
            message: JSON.parse(req.body[i])
        };
        io.sockets.emit('pipe', data);
        storage.open(config.dbPath, function(err, db) {
            if (err) {
                throw err;
            }
        });
        res.send('status: ok');
    }
});

app.listen(1000);