/**
 * FilestagesController
 *
 * @description :: Server-side logic for managing filestages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('underscore');

function store(req, res, next) {
    var payload = JSON.parse(req.param('json'));
    var availableItems = payload.availableItems;
    var selectedItems = payload.selectedItems;
    var session = payload.session,
        name = payload.name,
        available = [],
        selected = [];

    var item = {
        availableItems: availableItems,
        selectedItems: selectedItems,
        session: session,
        name: name
    };

    console.log('session: ' + session);
    console.log('selected/available: ' + availableItems.length + ' / ' + selectedItems.length);

    Semanticenrichmentstages.findOrCreate({
        session: session
    }, item, function(err, record) {
        if (err) {
            console.log('error: ' + err);
            res.send(err);
        }

        record.availableItems = availableItems;
        record.selectedItems = selectedItems;
        record.session = session;

        record.save().then(function(record) {
            console.log('saved available: ' + record.availableItems.length);
            console.log('saved selected: ' + record.selectedItems.length);

            res.send(record);
        })
    });
}

module.exports = {
    create: function(req, res, next) {
        console.log('create');
        store(req, res, next);
    },

    update: function(req, res, next) {
        console.log('update');
        store(req, res, next);
    }
};