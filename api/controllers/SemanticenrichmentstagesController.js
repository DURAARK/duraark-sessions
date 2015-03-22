/**
 * FilestagesController
 *
 * @description :: Server-side logic for managing filestages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('underscore');

// FIXXME: when sending an availableItems array with more then 20 entries the array is
// automagically converted into an object (there seems to be an error in sails). This
// is a workaround for that issue:
function _arrayWorkaround(req, res, next) {
    var params = req.params.all();
    var availableItems = req.param('availableItems');
    var selectedItems = req.param('selectedItems');
    var session = req.param('session'),
        name = req.param('name'),
        available = [],
        selected = [];


    _.forEach(availableItems, function(value, key) {
        available.push(value);
    });

    _.forEach(selectedItems, function(value, key) {
        selected.push(value);
    });

    console.log('selected/available: ' + selected.length + ' / ' + available.length);

    var item = {
        availableItems: available,
        selectedItems: selected,
        session: session,
        name: name
    };

    Semanticenrichmentstages.findOrCreate({
        session: session
    }, item, function(err, record) {
        if (err) {
            console.log('error: ' + err);
            res.send(err);
        }

        record.availableItems = available;
        record.selectedItems = selected;
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
        _arrayWorkaround(req, res, next);
    },

    update: function(req, res, next) {
        _arrayWorkaround(req, res, next);
    },
};