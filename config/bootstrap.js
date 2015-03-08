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
                    physicalAssets: [1],
                    digitalObjects: [1],
                    ifcms: [1],
                    e57ms: [1],
                    session: 1
                }, {
                    name: 'metadata',
                    physicalAssets: [2],
                    digitalObjects: [],
                    ifcms: [],
                    e57ms: [2],
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
    E57ms.find()
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
                var e57mItems = [{
                    schema: 'e57m',
                    file: '/home/martin/Coding/Projekte/duraark/duraark-platform-api/microservice-files/src/fixtures/storage/BunnyFloat.e57',
                    instance: {
                        "guid": "{36B88E64-E378-465E-BB4D-A6122DA3271B}",
                        "version_major": 1,
                        "version_minor": 0,
                        "creation_datetime": null,
                        "coordinate_metadata": "Not in use.",
                        "scan_count": 1,
                        "image_count": 0,
                        "scan_size": 1,
                        "image_size": 0,
                        "scans": [{
                            "name": "Nygade1001",
                            "guid": "9b8e58b3-454f-4be0-8756-59f4cca1f1ad",
                            "original_guids": [],
                            "description": "<AttrContainer>\n<Attr type=\"String\">\n<Name value=\"'Name'\" />\n<Value value=\"'E57ExportScanInfos'\" />\n</Attr>\n<Attr type=\"SVec2i\">\n<Name value=\"'OverlapHalf1'\" />\n<Value value=\"15 2551 \" />\n</Attr>\n<Attr type=\"SVec2i\">\n<Name value=\"'OverlapHalf2'\" />\n<Value value=\"0 0 \" />\n</Attr>\n</AttrContainer>\n",
                            "sensor_vendor": "FARO Scanner Production GmbH",
                            "sensor_model": "FARO Focus 3D S 120",
                            "sensor_serial_number": "LLS061203105",
                            "sensor_hardware_version": "",
                            "sensor_software_version": "5.3.0.37858",
                            "sensor_firmware_version": "\"iQLib\" 5.0.6.30068",
                            "temperature": 3.4028234663852886e+38,
                            "relative_humidity": 3.4028234663852886e+38,
                            "atmospheric_pressure": 3.4028234663852886e+38,
                            "acquisition_start": null,
                            "acquisition_end": null,
                            "pose": {
                                "rotation": {
                                    "w": 0.9592315235875369,
                                    "x": -0.007665274593169312,
                                    "y": -0.007286718303691214,
                                    "z": 0.28242349664591765
                                },
                                "translation": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 141.660082822
                                }
                            },
                            "index_bounds": {
                                "row_minimum": 0,
                                "row_maximum": 2133,
                                "col_minimum": 0,
                                "col_maximum": 5131,
                                "return_minimum": 0,
                                "return_maximum": 0
                            },
                            "cartesian_bounds": {
                                "x_minimum": -4.521761894226074,
                                "x_maximum": 7.401893615722656,
                                "y_minimum": -3.2791409492492676,
                                "y_maximum": 1.7601957321166992,
                                "z_minimum": -1.4357858896255493,
                                "z_maximum": 1.8196704387664795
                            },
                            "spherical_bounds": {
                                "range_minimum": 0.9692299962043762,
                                "range_maximum": 7.582670211791992,
                                "elevation_minimum": -1.0462665011240198,
                                "elevation_maximum": 1.5700227915171316,
                                "azimuth_minimum": 6.264556016604134,
                                "azimuth_maximum": -0.002566803835640421
                            },
                            "intensity_limits": {
                                "intensity_minimum": 0,
                                "intensity_maximum": 1
                            },
                            "color_limits": {
                                "color_red_minimum": 0,
                                "color_red_maximum": 255,
                                "color_green_minimum": 0,
                                "color_green_maximum": 255,
                                "color_blue_minimum": 0,
                                "color_blue_maximum": 255
                            },
                            "point_fields": {
                                "cartesian_x_field": true,
                                "cartesian_y_field": true,
                                "cartesian_z_field": true,
                                "cartesian_invalid_state_field": true,
                                "spherical_range_field": false,
                                "spherical_azimuth_field": false,
                                "spherical_elevation_field": false,
                                "spherical_invalid_state_field": false,
                                "point_range_minimum": -3.4028234663852886e+38,
                                "point_range_maximum": 3.4028234663852886e+38,
                                "point_range_scaled_integer": 0,
                                "angle_minimum": 0,
                                "angle_maximum": 0,
                                "angle_scaled_integer": 0,
                                "row_index_field": true,
                                "row_index_maximum": 4294967295,
                                "column_index_field": true,
                                "column_index_maximum": 4294967295,
                                "return_index_field": false,
                                "return_count_field": false,
                                "return_maximum": 0,
                                "time_stamp_field": false,
                                "is_Time_Stamp_Invalid_field": false,
                                "time_Maximum": 0,
                                "intensity_field": true,
                                "is_intensity_invalid_field": false,
                                "intensity_scaled_integer": 0.0004885197850512946,
                                "color_red_field": true,
                                "color_green_field": true,
                                "color_blue_field": true,
                                "is_color_invalid_field": false
                            },
                            "points_size": 10930638
                        }],
                        "images": []
                    }
                }, {
                    schema: 'e57m',
                    file: '/home/martin/Coding/Projekte/duraark/duraark-platform-api/microservice-files/src/fixtures/storage/BunnyFloat.e57',
                    instance: {
                        "guid": "{36B88E64-E378-465E-BB4D-A6122DA3271B}",
                        "version_major": 1,
                        "version_minor": 0,
                        "creation_datetime": null,
                        "coordinate_metadata": "Not in use.",
                        "scan_count": 1,
                        "image_count": 0,
                        "scan_size": 1,
                        "image_size": 0,
                        "scans": [{
                            "name": "Nygade1001",
                            "guid": "9b8e58b3-454f-4be0-8756-59f4cca1f1ad",
                            "original_guids": [],
                            "description": "<AttrContainer>\n<Attr type=\"String\">\n<Name value=\"'Name'\" />\n<Value value=\"'E57ExportScanInfos'\" />\n</Attr>\n<Attr type=\"SVec2i\">\n<Name value=\"'OverlapHalf1'\" />\n<Value value=\"15 2551 \" />\n</Attr>\n<Attr type=\"SVec2i\">\n<Name value=\"'OverlapHalf2'\" />\n<Value value=\"0 0 \" />\n</Attr>\n</AttrContainer>\n",
                            "sensor_vendor": "FARO Scanner Production GmbH",
                            "sensor_model": "FARO Focus 3D S 120",
                            "sensor_serial_number": "LLS061203105",
                            "sensor_hardware_version": "",
                            "sensor_software_version": "5.3.0.37858",
                            "sensor_firmware_version": "\"iQLib\" 5.0.6.30068",
                            "temperature": 3.4028234663852886e+38,
                            "relative_humidity": 3.4028234663852886e+38,
                            "atmospheric_pressure": 3.4028234663852886e+38,
                            "acquisition_start": null,
                            "acquisition_end": null,
                            "pose": {
                                "rotation": {
                                    "w": 0.9592315235875369,
                                    "x": -0.007665274593169312,
                                    "y": -0.007286718303691214,
                                    "z": 0.28242349664591765
                                },
                                "translation": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 141.660082822
                                }
                            },
                            "index_bounds": {
                                "row_minimum": 0,
                                "row_maximum": 2133,
                                "col_minimum": 0,
                                "col_maximum": 5131,
                                "return_minimum": 0,
                                "return_maximum": 0
                            },
                            "cartesian_bounds": {
                                "x_minimum": -4.521761894226074,
                                "x_maximum": 7.401893615722656,
                                "y_minimum": -3.2791409492492676,
                                "y_maximum": 1.7601957321166992,
                                "z_minimum": -1.4357858896255493,
                                "z_maximum": 1.8196704387664795
                            },
                            "spherical_bounds": {
                                "range_minimum": 0.9692299962043762,
                                "range_maximum": 7.582670211791992,
                                "elevation_minimum": -1.0462665011240198,
                                "elevation_maximum": 1.5700227915171316,
                                "azimuth_minimum": 6.264556016604134,
                                "azimuth_maximum": -0.002566803835640421
                            },
                            "intensity_limits": {
                                "intensity_minimum": 0,
                                "intensity_maximum": 1
                            },
                            "color_limits": {
                                "color_red_minimum": 0,
                                "color_red_maximum": 255,
                                "color_green_minimum": 0,
                                "color_green_maximum": 255,
                                "color_blue_minimum": 0,
                                "color_blue_maximum": 255
                            },
                            "point_fields": {
                                "cartesian_x_field": true,
                                "cartesian_y_field": true,
                                "cartesian_z_field": true,
                                "cartesian_invalid_state_field": true,
                                "spherical_range_field": false,
                                "spherical_azimuth_field": false,
                                "spherical_elevation_field": false,
                                "spherical_invalid_state_field": false,
                                "point_range_minimum": -3.4028234663852886e+38,
                                "point_range_maximum": 3.4028234663852886e+38,
                                "point_range_scaled_integer": 0,
                                "angle_minimum": 0,
                                "angle_maximum": 0,
                                "angle_scaled_integer": 0,
                                "row_index_field": true,
                                "row_index_maximum": 4294967295,
                                "column_index_field": true,
                                "column_index_maximum": 4294967295,
                                "return_index_field": false,
                                "return_count_field": false,
                                "return_maximum": 0,
                                "time_stamp_field": false,
                                "is_Time_Stamp_Invalid_field": false,
                                "time_Maximum": 0,
                                "intensity_field": true,
                                "is_intensity_invalid_field": false,
                                "intensity_scaled_integer": 0.0004885197850512946,
                                "color_red_field": true,
                                "color_green_field": true,
                                "color_blue_field": true,
                                "is_color_invalid_field": false
                            },
                            "points_size": 10930638
                        }],
                        "images": []
                    }
                }];

                _.forEach(e57mItems, function(item) {
                    E57ms.create(item).exec(function(err, record) {
                        if (err) {
                            console.log('err create: ' + err);
                        } else {
                            console.log('created e57m: ' + JSON.stringify(record, null, 4));

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
                    file: '/home/martin/Coding/Projekte/duraark/duraark-platform-api/microservice-files/src/fixtures/storage/3DSDI.ifc',
                    instance: {
                        header: {
                            creationDate: new Date(),
                            author: 'Martin Hecher',
                            organization: 'TU Graz',
                            preprocessor: 'none',
                            originatingSystem: 'none',
                            authorization: 'none',
                            fileSchema: 'IFC-SPF',
                            viewDefinition: 'none',
                            exportOptions: 'none'
                        },
                        ifcparameters: {
                            ifcApplication: 'Blender',
                            IfcGeometricRepresentationContext: 'none',
                            ifcSiUnit: 'none'
                        },
                        countObjects: {
                            floorCount: 3,
                            roomCount: 3,
                            wallCount: 3,
                            windowsCount: 3,
                            doorCount: 3,
                            pipeCount: 3,
                            columnCount: 3,
                            numberOfComponents: 3,
                            numberOfRelations: 3,
                            numberOfActors: 3
                        },
                        informationMetric: {
                            numberOfEntityTypesUsed: 3,
                            numberOfTotalEntitiesUsed: 3,
                            optionalAttributes: 0
                        },
                        dependencies: {
                            webResourceLink: 'none'
                        }
                    }
                }];

                _.forEach(ifcmItems, function(item) {
                    Ifcms.create(item).exec(function(err, record) {
                        if (err) {
                            console.log('err create: ' + err);
                        } else {
                            console.log('created ifcm: ' + JSON.stringify(record, null, 4));

                            record.save(function(err) {
                                if (err) {
                                    console.log('save err: ' + err);
                                }
                            });
                        }
                    });
                });

                var physicalAssetItems = [{
                    schema: 'buildm',
                    file: '/home/martin/Coding/Projekte/duraark/duraark-platform-api/microservice-files/src/fixtures/storage/3DSDI.ifc',
                    instance: {
                        Identifier: '1234-2345-3456-4567',
                        latitude: 13,
                        longitude: 44,
                        owner: 'TU Graz',
                        buildingArea: 4932,
                        floorCount: 3,
                        numberOfRooms: 145,
                        'function': 'Educational building',
                        architecturalStyle: 'reduced',
                        description: 'Campus building',
                        location: 'At the campus',
                        streetAddress: 'Inffeldgasse 16c, III',
                        postalCodeStart: '16',
                        postalCodeEnd: '16',
                        postOfficeBoxNumber: '',
                        addressRegion: 'Graz',
                        postalLocality: 'Graz',
                        architect: 'Martina Musterfrau',
                        contributor: 'Max Mustermann',
                        startDate: 2001,
                        completionDate: 2004,
                        constructionTime: 1024,
                        rebuildingDate: 0,
                        modificationDetails: 'none',
                        cost: 1,
                        rightsDetails: 'unknown'
                    }
                }, {
                    schema: 'buildm',
                    file: '/home/martin/Coding/Projekte/duraark/duraark-platform-api/microservice-files/src/fixtures/storage/3DSDI.ifc',
                    instance: {
                        Identifier: '1234-2345-3456-4567',
                        latitude: 13,
                        longitude: 44,
                        owner: 'TU Graz',
                        buildingArea: 4932,
                        floorCount: 3,
                        numberOfRooms: 145,
                        'function': 'Educational building',
                        architecturalStyle: 'reduced',
                        description: 'Campus building',
                        location: 'At the campus',
                        streetAddress: 'Inffeldgasse 16c, III',
                        postalCodeStart: '16',
                        postalCodeEnd: '16',
                        postOfficeBoxNumber: '',
                        addressRegion: 'Graz',
                        postalLocality: 'Graz',
                        architect: 'Martina Musterfrau',
                        contributor: 'Max Mustermann',
                        startDate: 2001,
                        completionDate: 2004,
                        constructionTime: 1024,
                        rebuildingDate: 0,
                        modificationDetails: 'none',
                        cost: 1,
                        rightsDetails: 'unknown'
                    }
                }];

                _.forEach(physicalAssetItems, function(item) {
                    Physicalassets.create(item).exec(function(err, record) {
                        if (err) {
                            console.log('err create: ' + err);
                        } else {
                            console.log('created physical asset: ' + JSON.stringify(record, null, 4));

                            record.save(function(err) {
                                if (err) {
                                    console.log('save err: ' + err);
                                }
                            });
                        }
                    });
                });

                var digitalObjectItems = [{
                    schema: 'buildm',
                    file: '/home/martin/Coding/Projekte/duraark/duraark-platform-api/microservice-files/src/fixtures/storage/3DSDI.ifc',
                    instance: {
                        Identifier: '2345-3456-4567-5678',
                        creator: 'Martin Hecher',
                        name: '3DSDI.ifc',
                        dateCreated: new Date(),
                        isPartOf: '1234-2345-3456-4567',
                        hasPart: '',
                        format: 'IFC-SPF',
                        hasType: 'plan',
                        hasFormatDetails: 'SPF',
                        description: 'no description given',
                        provenance: 'none',
                        license: 'unknown',
                        unitCode: 'sii',
                        levelOfDetail: 'none'
                    }
                }, {
                    schema: 'buildm',
                    file: '/home/martin/Coding/Projekte/duraark/duraark-platform-api/microservice-files/src/fixtures/storage/3DSDI.ifc',
                    instance: {
                        Identifier: '2345-3456-4567-5678',
                        creator: 'Martin Hecher',
                        name: '3DSDI.ifc',
                        dateCreated: new Date(),
                        isPartOf: '1234-2345-3456-4567',
                        hasPart: '',
                        format: 'IFC-SPF',
                        hasType: 'plan',
                        hasFormatDetails: 'SPF',
                        description: 'no description given',
                        provenance: 'none',
                        license: 'unknown',
                        unitCode: 'sii',
                        levelOfDetail: 'none'
                    }
                }];

                _.forEach(digitalObjectItems, function(item) {
                    Digitalobjects.create(item).exec(function(err, record) {
                        if (err) {
                            console.log('err create: ' + err);
                        } else {
                            console.log('created digital object: ' + JSON.stringify(record, null, 4));

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