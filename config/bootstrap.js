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
    initSemenrichmentstages();
    initGeoenrichmentstages();

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
                    metadatastage: 1,
                    semenrichmentstage: 1,
                    geoenrichmentstage: 1,
                }, {
                    name: 'Nygade',
                    creator: 'Martin Hecher',
                    filestage: 2,
                    metadatastage: 2,
                    semenrichmentstage: 2,
                    geoenrichmentstage: 2,
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
                console.log('"Metadatastages" already in place, skipping creation.');
                return;
            } else {
                var items = [{
                    name: 'metadata',
                    metadata: [1, 3],
                    session: 1
                }, {
                    name: 'metadata',
                    metadata: [2, 3],
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

function initSemenrichmentstages() {
    Semenrichmentstages.find()
        .where({
            id: {
                '>': 0
            }
        })
        .then(function(records) {
            if (records.length) {
                console.log('"Semenrichmentstages" already in place, skipping creation.');
                return;
            } else {
                var items = [{
                    name: 'semenrichment',
                    metadata: [5, 6, 7, 8],
                    session: 1
                }, {
                    name: 'semenrichment',
                    metadata: [6, 7, 8],
                    session: 2
                }];

                _.forEach(items, function(item) {
                    Semenrichmentstages.create(item).exec(function(err, record) {
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

function initGeoenrichmentstages() {
    Geoenrichmentstages.find()
        .where({
            id: {
                '>': 0
            }
        })
        .then(function(records) {
            if (records.length) {
                console.log('"Geoenrichmentstages" already in place, skipping creation.');
                return;
            } else {
                var items = [{
                    name: 'geoenrichment',
                    metadata: [9, 10, 11],
                    session: 1
                }, {
                    name: 'geoenrichment',
                    metadata: [9, 10, 11],
                    session: 2
                }];

                _.forEach(items, function(item) {
                    Geoenrichmentstages.create(item).exec(function(err, record) {
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
                    schema: 'buildm',
                    format: 'application/json',
                    model: {
                        creator: 'Martin Hecher',
                        createdAt: new Date()
                    }
                }, {
                    schema: 'buildm',
                    format: 'application/json',
                    model: {
                        creator: 'Sebastian Bach',
                        createdAt: new Date()
                    }
                }, {
                    schema: 'ifcm',
                    format: 'application/json',
                    model: {
                        address: 'Inffeldgasse 16c/III',
                        numRooms: 5
                    }
                }, {
                    schema: 'e57m',
                    format: 'application/json',
                    model: {
                        address: 'Inffeldgasse 16c/III',
                        numRooms: 5
                    }
                }, {
                    schema: 'semenrich',
                    format: 'application/ld+json',
                    model: {
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Graz",
                            "addressRegion": "AT",
                            "streetAddress": "Inffeldgasse 16c"
                        }
                    }
                }, {
                    schema: 'semenrich',
                    format: 'application/ld+json',
                    model: {
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Graz",
                            "addressRegion": "AT",
                            "streetAddress": "Inffeldgasse 16c"
                        }
                    }
                }, {
                    schema: 'semenrich',
                    format: 'application/ld+json',
                    model: {
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Graz",
                            "addressRegion": "AT",
                            "streetAddress": "Inffeldgasse 16c"
                        }
                    }
                }, {
                    schema: 'semenrich',
                    format: 'application/ld+json',
                    model: {
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Graz",
                            "addressRegion": "AT",
                            "streetAddress": "Inffeldgasse 16c"
                        }
                    }
                }, {
                    schema: 'geoenrich',
                    format: 'application/duraark+geoenrich',
                    model: {
                        application: 'RISE',
                        inputFiles: [1, 2, 3],
                        outputFiles: [1, 2, 3]
                    }
                }, {
                    schema: 'geoenrich',
                    format: 'application/duraark+geoenrich',
                    model: {
                        application: 'DifferenceDetection',
                        inputFiles: [1, 2, 3],
                        outputFiles: [1, 2, 3]
                    }
                }, {
                    schema: 'geoenrich',
                    format: 'application/duraark+geoenrich',
                    model: {
                        application: 'IFCReconstruction ',
                        inputFiles: [1, 2, 3],
                        outputFiles: [1, 2, 3]
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
