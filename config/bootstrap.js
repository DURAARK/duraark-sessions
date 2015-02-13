/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var _ = require('underscore');

module.exports.bootstrap = function(cb) {

    initSessions();
    initStages();

    cb();
};

function initSessions() {
    Sessions.find()
        .where({
            id: {
                '>': 0
            }
        })
        .then(function(records) {
            if (records.length) {
                console.log('"Sessions" already in place, skipping creation.');
                return;
            } else {
                var items = [{
                    name: 'Inffeldgasse 16c',
                    creator: 'Martin Hecher',
                    filestage: 1
                }, {
                    name: 'Power Socket Scan',
                    creator: 'Martin Hecher',
                    filestage: 2
                }];

                _.forEach(items, function(item) {
                    Sessions.create(item).exec(function(err, record) {
                        if (err) {
                            console.log('err create: ' + err);
                        } else {
                            console.log('created session: ' + JSON.stringify(record, null, 4));

                            record.save(function(err) {
                                if (err) {
                                    console.log('save err: ' + err);
                                }
                            });
                        }
                    });
                });

                console.log('   done');
            }
        });
}

function initStages() {
    Filestages.find()
        .where({
            id: {
                '>': 0
            }
        })
        .then(function(records) {
            if (records.length) {
                console.log('"Filestages" already in place, skipping creation.');
                return;
            } else {
                var items = [{
                    name: 'files',
                    files: [1, 2],
                    session: 1
                }, {
                    name: 'files',
                    files: [2],
                    session: 2
                }];

                _.forEach(items, function(item) {
                    Filestages.create(item).exec(function(err, record) {
                        if (err) {
                            console.log('err create: ' + err);
                        } else {
                            console.log('created filestage: ' + JSON.stringify(record, null, 4));

                            record.save(function(err) {
                                if (err) {
                                    console.log('save err: ' + err);
                                }
                            });
                        }
                    });
                });

                console.log('   done');
            }
        });
}