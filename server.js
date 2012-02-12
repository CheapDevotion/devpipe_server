/*jslint node: true, forin: true, sloppy: true, maxerr: 50, indent: 4 */
var config  = require('./config.js'),
    express = require('express'),
    Alfred  = require('alfred'),
    fs      = require('fs'),
    app     = express.createServer(),
    io      = require('socket.io').listen(1001);

// Configure app and sockets
app.use(express.bodyParser());
io.configure(function () {
    io.set('transports', ['jsonp-polling']);
});

// Return a list of all projects
app.post('/projects/:project', function (req, res) {
    var project = req.params.project,
        now     = new Date(),
        data    = { project: req.params.project },
        i;
        
    for (i in req.body) {
        data.message = JSON.parse(req.body[i]);
        io.sockets.emit('pipe', data);
        Alfred.open(config.dbPath, function(err, db) {
            if (err) throw err;
            
            db.entries.put(project + ':' + now.toJSON(), data, function(err) {
                if (err) throw err;
            });
        });
        res.send('status: ok');
    }
});

app.get('/', function (req, res) {
    Alfred.open(config.dbPath, function(err, db) {
        if (err) throw err;
        
        db.entries.find({ project: 'comic_book_characters' }, function (err, key, entry) {
            if (err) throw err;
            
            console.log(key);
            console.log(entry);
        });
        
        res.send('hi');
    });
});

io.sockets.on('pipe', function () {
    console.log('hi');
});

app.listen(1000);