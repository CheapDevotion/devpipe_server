#!/usr/bin/env node
var config   = require('./config.js'),
    alfred   = require('alfred'),
    PROJECTS = {};

PROJECTS = {
    1: {name: 'Google'},
    2: {name: 'Facebook'},
    3: {name: 'Twitter'},
    4: {name: 'Reddit'}
};

alfred.open(config.dbPath, function (err, db) {
    if (err) {
        throw err;
    }
    
    db.ensure('projects', function (err, km) {
        console.log('projects db created');
        for (id in PROJECTS) {
            if (PROJECTS.hasOwnProperty(id)) {
                db.projects.put(id, PROJECTS[id], function (err) {
                    if (err) {
                        throw err;
                    }

                    console.log('|-project: ' + PROJECTS[id].name + ' inserted.');
                });
            }
        }
    });
    
});