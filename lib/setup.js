#!/usr/bin/env node

var config  = require('../config.js'),
    storage = require('alfred'),
    fs      = require('fs');

function Setup () {
    this.dbPath = config.dbPath;
}

Setup.prototype = new process.EventEmitter();

// Make data directory, if it doesn't exist
Setup.prototype.createPath = function () {
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

Setup.prototype.ensureCollections = function () {
    var that = this;
    
    console.log('Ensuring entries collection...')
    storage.open(config.dbPath, function (err, db) {
        if (err) throw err;
    
        db.ensure('project', function(err, entries) {
            if (err) throw err;
            
            entries.addIndex('entries', function(entry) {
                 return entry;
              }, function(err) {
                if (err) throw err;
            });
            
            entries.addIndex('timestamp', function(entry) {
                 return entry;
              }, function(err) {
                if (err) throw err;
            });
            
            that.emit('collectionEnsured');
        });
    });
};

Setup.prototype.init = function () {
    this.createPath();
};

Setup.prototype.on('pathExists', function () {
    this.ensureCollections();
});

Setup.prototype.on('collectionEnsured', function () {
    console.log('All done.');
    process.exit(1);
});

module.exports = new Setup;