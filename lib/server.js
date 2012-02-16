/*jslint node: true, forin: true, sloppy: true, maxerr: 50, indent: 4 */
var config  = require('../config'),
    express = require('express'),
    Alfred  = require('alfred'),
    fs      = require('fs'),
    io      = require('socket.io').listen(1001),
    app     = express.createServer();

// Configure app and sockets
app.use(express.bodyParser());
io.configure(function () {
    io.set('transports', ['jsonp-polling']);
});

// Return a list of all projects
app.post('/project/:project', function (req, res) {
    var project = req.params.project,
        now     = new Date(),
        data    = { project: req.params.project, timestamp: now.toJSON() },
        i;
    
    for (i in req.body) {
        data.message = JSON.parse(req.body[i]);
        io.sockets.emit('pipe', data);
        Alfred.open(config.dbPath, function (err, db) {
            if (err) throw err;
            
            db.entries.put(project + ':' + now.toJSON(), data, function (err) {
                if (err) throw err;
            });
            
            db.close(function (err) {
                if (err) throw err;
            });
        });
        res.send('status: ok');
    }
});

app.listen(1000);