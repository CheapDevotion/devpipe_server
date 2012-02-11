#!/usr/bin/env node

var config  = require('../config.js'),
    storage = require('alfred'),
    fs      = require('fs');

function Initializer () {
    this.dbPath = config.dbPath;
}

Initializer.prototype = new process.EventEmitter();

// Make data directory, if it doesn't exist
Initializer.prototype.createPath = function () {
    var that = this;
    
    console.log('Attempting to create data directory...');
    fs.stat(config.dbPath, function (err, stats) {
        if (err !== null) {
            fs.mkdir(that.dbPath, 0755, function () {
                console.log('Created ' + that.dbPath);
                that.emit('pathExists');
            });
        } else {
            console.log(that.dbPath + ' already exists');
            that.emit('pathExists');
        }
    });
};

Initializer.prototype.ensureCollections = function () {
    var that = this;
    
    console.log("\n" + 'Ensuring entries collection...')
    storage.open(config.dbPath, function (err, db) {
        if (err) {
            throw err;
        }
    
        db.ensure('entries', function(err, users_key_map) {
            if (err) {
                throw err;
            }
            
            that.emit('collectionEnsured');
        });
    });
};

Initializer.prototype.init = function () {
    this.createPath();
};

Initializer.prototype.on('pathExists', function () {
    this.ensureCollections();
});

Initializer.prototype.on('collectionEnsured', function () {
    console.log('All done.');
    process.exit(1);
});

var init = new Initializer();

init.init();