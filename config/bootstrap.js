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
    initSemanticenrichmentstages();
    initSemanticenrichmentMetadata();
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
                    semanticenrichmentstage: 1,
                    geometricenrichmentstage: 1,
                }, {
                    name: 'Nygade',
                    creator: 'Martin Hecher',
                    filestage: 2,
                    metadatastage: 2,
                    semanticenrichmentstage: 2,
                    geometricenrichmentstage: 2,
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
                    buildm: 1,
                    ifcm: 1,
                    e57m: 1,
                    session: 1
                }, {
                    name: 'metadata',
                    buildm: 2,
                    ifcm: 2,
                    e57m: 2,
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

function initSemanticenrichmentstages() {
    Semanticenrichmentstages.find()
        .where({
            id: {
                '>': 0
            }
        })
        .then(function(records) {
            if (records.length) {
                console.log('"Semanticenrichmentstages" already in place, skipping creation.');
                return;
            } else {
                var items = [{
                    name: 'semanticenrichment',
                    availableItems: [],
                    selectedItems: [],
                    session: 1
                }, {
                    name: 'semanticenrichment',
                    availableItems: [],
                    selectedItems: [],
                    session: 2
                }];

                _.forEach(items, function(item) {
                    Semanticenrichmentstages.create(item).exec(function(err, record) {
                        if (err) {
                            console.log('err create: ' + err);
                        } else {
                            console.log('created semanticenrichmentstage: ' + JSON.stringify(record, null, 4));

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

function initSemanticenrichmentMetadata() {
    Enrichment.find()
        .where({
            id: {
                '>': 0
            }
        })
        .then(function(records) {
            if (records.length) {
                console.log('"Enrichment" already in place, skipping creation.');
                return;
            } else {
                var items = [{
                    id: 1,
                    metadata: [{
                        datasetId: 'datasetId',
                        datasetName: 'datasetName',
                        resourceId: 'resourceId',
                        resourceUri: 'resourceUri',
                        propertyUri: 'propertyUri'
                    }, {
                        datasetId: 'datasetId',
                        datasetName: 'datasetName',
                        resourceId: 'resourceId',
                        resourceUri: 'resourceUri',
                        propertyUri: 'propertyUri'
                    }, {
                        datasetId: 'datasetId',
                        datasetName: 'datasetName',
                        resourceId: 'resourceId',
                        resourceUri: 'resourceUri',
                        propertyUri: 'propertyUri'
                    }, {
                        datasetId: 'datasetId',
                        datasetName: 'datasetName',
                        resourceId: 'resourceId',
                        resourceUri: 'resourceUri',
                        propertyUri: 'propertyUri'
                    }, {
                        datasetId: 'datasetId',
                        datasetName: 'datasetName',
                        resourceId: 'resourceId',
                        resourceUri: 'resourceUri',
                        propertyUri: 'propertyUri'
                    }]
                }, {
                    id: 2,
                    metadata: [{
                        datasetId: 'datasetId',
                        datasetName: 'datasetName',
                        resourceId: 'resourceId',
                        resourceUri: 'resourceUri',
                        propertyUri: 'propertyUri'
                    }, {
                        datasetId: 'datasetId',
                        datasetName: 'datasetName',
                        resourceId: 'resourceId',
                        resourceUri: 'resourceUri',
                        propertyUri: 'propertyUri'
                    }]
                }];

                _.forEach(items, function(item) {
                    Enrichment.create(item).exec(function(err, record) {
                        if (err) {
                            console.log('err create: ' + err);
                        } else {
                            console.log('created enrichment: ' + JSON.stringify(record, null, 4));

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
                            console.log('created geoenrichmentstage: ' + JSON.stringify(record, null, 4));

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
    Buildms.find()
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
                var buildmItems = [{
                    schema: 'buildm',
                    latitude: 13,
                    longitude: 45
                }, {
                    schema: 'buildm',
                    latitude: 13,
                    longitude: 45
                }];

                _.forEach(buildmItems, function(item) {
                    Buildms.create(item).exec(function(err, record) {
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

                var ifcmItems = [{
                    schema: 'ifcm',
                    creator: 'Martin Hecher',
                    streetAdress: 'Inffeldgasse 16c'
                }, {
                    schema: 'ifcm',
                    creator: 'Nelson Silva',
                    streetAdress: 'Neue Gasse 16c'
                }];

                _.forEach(ifcmItems, function(item) {
                    Ifcms.create(item).exec(function(err, record) {
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

                var e57mItems = [{
                    schema: 'e57m',
                    scans: 2,
                    floors: 3
                }, {
                    schema: 'e57m',
                    scans: 5,
                    floors: 5
                }];

                _.forEach(e57mItems, function(item) {
                    E57ms.create(item).exec(function(err, record) {
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