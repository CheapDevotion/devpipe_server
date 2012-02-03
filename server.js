/*jslint undef: true, unparam: true, sloppy: true, maxerr: 50, indent: 4 */
var config  = require('./config.js'),
    express = require('express'),
    storage = require('alfred'),
    app     = express.createServer(),
    io      = require('socket.io').listen(app);

// Configure app and sockets
app.use(express.bodyParser());
io.configure(function () {
    io.set('transports', ['jsonp-polling']);
});

// Return a list of all projects
app.get('/projects', function (req, res) {
    console.log('projects...');
    
    // io.sockets.emit('projects', {
    //     projects: JSON.parse(projects)
    // });
    
    storage.open(config.dbPath, function (err, db) {
        if (err) {
            throw err;
        }
        
        db.projects.find(function (err, projects) {
            console.log(err);
            console.log(projects);
        });
    });
});

app.listen(1000);