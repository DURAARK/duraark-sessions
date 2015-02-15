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
    initFilestages();
    initMetadatastages();
    initMetadata();

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
                    filestage: 1,
                    metadatastage: 1
                }, {
                    name: 'Power Socket Scan',
                    creator: 'Martin Hecher',
                    filestage: 2,
                    metadatastage: 2
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

function initFilestages() {
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

function initMetadatastages() {
    Metadatastages.find()
        .where({
            id: {
                '>': 0
            }
        })
        .then(function(records) {
            if (records.length) {
                console.log('"Metadatastage" already in place, skipping creation.');
                return;
            } else {
                var items = [{
                    name: 'metadata',
                    metadata: [1, 2],
                    session: 1
                }, {
                    name: 'metadata',
                    metadata: [1],
                    session: 2
                }];

                _.forEach(items, function(item) {
                    Metadatastages.create(item).exec(function(err, record) {
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

function initMetadata() {
    Metadata.find()
        .where({
            id: {
                '>': 0
            }
        })
        .then(function(records) {
            if (records.length) {
                console.log('"Metadata" already in place, skipping creation.');
                return;
            } else {
                var items = [{
                    schema: 'e57m',
                    format: 'application/json',
                    model: {
                        floors: 3,
                        numScans: 2
                    }
                }, {
                    schema: 'ifcm',
                    format: 'application/json',
                    model: {
                        address: 'Inffeldgasse 16c/III',
                        numRooms: 5
                    }
                }];

                _.forEach(items, function(item) {
                    Metadata.create(item).exec(function(err, record) {
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