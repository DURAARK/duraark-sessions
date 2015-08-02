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
        console.log('\n[bootstrapping] "Session" fixtures cached, skipping creation.\n');
        return;
      } else {
        Sessions.create(sessions).then(function(sessions) {
          console.log('   created sessions: ' + sessions.length);
        })
      }
    });
}

var paMD = {
  "@id": "http://data.duraark.eu/resource/physicalasset_d86c761c42e440659a8a5b945f695b76",
  "@type": [
    "http://data.duraark.eu/vocab/PhysicalAsset"
  ],
  "http://data.duraark.eu/vocab/buildingCount": [{
    "@value": "1",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/columnCount": [{
    "@value": "0",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/componentCount": [{
    "@value": "129",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/doorCount": [{
    "@value": "17",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/floorCount": [{
    "@value": "2",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/identifier": [{
    "@value": "3OR7OSGkH0PPgAMvHVQLjs"
  }],
  "http://data.duraark.eu/vocab/latitude": [{
    "@value": "42.3582999997",
    "@type": "http://www.w3.org/TR/xmlschema11-2/#double"
  }],
  "http://data.duraark.eu/vocab/longitude": [{
    "@value": "-71.0602999997",
    "@type": "http://www.w3.org/TR/xmlschema11-2/#double"
  }],
  "http://data.duraark.eu/vocab/name": [{
    "@value": "001",
    "@type": "http://schema.org/Text"
  }],
  "http://data.duraark.eu/vocab/spaceCount": [{
    "@value": "0",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/streetAddress": [{
    "@value": "Enter address here"
  }],
  "http://data.duraark.eu/vocab/wallCount": [{
    "@value": "46",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/windowCount": [{
    "@value": "14",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }]
};

var doMD = {
  "@id": "http://data.duraark.eu/resource/ifcspffile_d86c761c42e440659a8a5b945f695b76",
  "@type": [
    "http://data.duraark.eu/vocab/IFCSPFFile"
  ],
  "http://data.duraark.eu/vocab/actorCount": [{
    "@value": "0",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/authoringTool": [{
    "@value": "20140606_1530(x64) - Exporter 15.2.0.0 - Alternate UI 15.2.0.0"
  }, {
    "@value": "Autodesk Revit 2015 (ENU)"
  }, {
    "@value": "The EXPRESS Data Manager Version 5.02.0100.07 : 28 Aug 2013"
  }],
  "http://data.duraark.eu/vocab/creator": [{
    "@value": ""
  }, {
    "@value": "Nancy "
  }],
  "http://data.duraark.eu/vocab/dateCreated": [{
    "@value": "2015-01-12T12:04:17"
  }],
  "http://data.duraark.eu/vocab/dimensionCount": [{
    "@value": "3",
    "@type": "http://www.w3.org/2001/XMLSchema#integer"
  }],
  "http://data.duraark.eu/vocab/entityCount": [{
    "@value": "86",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/fileSchema": [{
    "@value": "IFC2X3"
  }],
  "http://data.duraark.eu/vocab/geometricPrecision": [{
    "@value": "0.01",
    "@type": "http://www.w3.org/2001/XMLSchema#decimal"
  }],
  "http://data.duraark.eu/vocab/hasType": [{
    "@value": "Model"
  }],
  "http://data.duraark.eu/vocab/instanceCount": [{
    "@value": "5311",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/name": [{
    "@value": "001"
  }],
  "http://data.duraark.eu/vocab/optionalAttributesSet": [{
    "@value": "0.520128179451",
    "@type": "http://www.w3.org/2001/XMLSchema#double"
  }],
  "http://data.duraark.eu/vocab/relationshipCount": [{
    "@value": "362",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
  }],
  "http://data.duraark.eu/vocab/unit": [{
    "@value": "KILONEWTON"
  }, {
    "@id": "http://qudt.org/vocab/unit#Ampere"
  }, {
    "@id": "http://qudt.org/vocab/unit#Candela"
  }, {
    "@id": "http://qudt.org/vocab/unit#CubicMeter"
  }, {
    "@id": "http://qudt.org/vocab/unit#DegreeCelsius"
  }, {
    "@id": "http://qudt.org/vocab/unit#Hertz"
  }, {
    "@id": "http://qudt.org/vocab/unit#Kilogram"
  }, {
    "@id": "http://qudt.org/vocab/unit#Lumen"
  }, {
    "@id": "http://qudt.org/vocab/unit#Lux"
  }, {
    "@id": "http://qudt.org/vocab/unit#Millimeter"
  }, {
    "@id": "http://qudt.org/vocab/unit#Pascal"
  }, {
    "@id": "http://qudt.org/vocab/unit#SecondTime"
  }, {
    "@id": "http://qudt.org/vocab/unit#SquareMeter"
  }, {
    "@id": "http://qudt.org/vocab/unit#Volt"
  }, {
    "@id": "http://qudt.org/vocab/unit#Watt"
  }]
};

var semMD = {
  candidates: [], // TODO
  topics: [], // TODO
  selection: [] // TODO
};

var derivatives = [{
  label: 'Haus 30 (Reconstruction)',
  path: '/storage/1234-1234-1234-1234/digitalObjects/haus30-reconstruction.ifc',
  type: 'reconstruction', // NOTE: necessary only for GUI at the moment
  buildm: doMD,
  semMD: semMD
    // derivatives: [{...},{...}] // TODO: do we need 'derivatives' here or not?
}, {
  label: 'Haus 30 (with electrical appliances)',
  path: '/storage/1234-1234-1234-1234/digitalObjects/haus30-electrical-appliances.ifc',
  type: 'electrical-appliances', // NOTE: necessary only for GUI at the moment
  physicalAssets: [0],
  buildm: doMD,
  semMD: semMD
}, {
  label: 'Haus 30 (Reconstruction)',
  path: '/storage/1234-1234-1234-1234/digitalObjects/haus30-reconstruction.ifc',
  type: 'hidden-features', // NOTE: necessary only for GUI at the moment
  buildm: doMD,
  semMD: semMD,
}, {
  label: 'Difference to: Haus 30 (Scan: 2014-03-22)',
  path: '/storage/1234-1234-1234-1234/digitalObjects/deviation-2014-03-22.rdf',
  type: 'difference-detection', // NOTE: necessary only for GUI at the moment
  physicalAssets: [0],
  buildm: doMD,
  semMD: semMD
}, {
  label: 'Registration to: Haus 30 (Scan: 2014-03-22)',
  path: '/storage/1234-1234-1234-1234/digitalObjects/registraction-2014-03-22.rdf',
  type: 'registration', // NOTE: necessary only for GUI at the moment
  physicalAssets: [0],
  buildm: doMD,
  semMD: semMD
}];

var sessions = [{
  label: 'Haus 30',

  physicalAssets: [],
  digitalObjects: [],

  // physicalAssets: [{
  //   label: 'Haus 30 Building Site',
  //   buildm: paMD
  // }],
  //
  // digitalObjects: [{
  //   label: 'Haus 30 BIM file',
  //   path: '/storage/1234-1234-1234-1234/digitalObjects/haus30.ifc',
  //   physicalAssets: [0],
  //   buildm: doMD,
  //   semMD: semMD,
  //   derivatives: []
  // }, {
  //   label: 'Haus 30 point cloud scan',
  //   path: '/storage/1234-1234-1234-1234/digitalObjects/haus30.e57',
  //   physicalAssets: [0],
  //   buildm: doMD,
  //   semMD: semMD,
  //   derivatives: derivatives
  // }],

  config: {
    sda: {
      topics: ["Haus 30 (general context)", "Haus 30 (political context)"]
    },
    geometricenrichment: {
      tools: ["IFC Reconstruction"]
    }
  },

  fixedInputFiles: [{
    path: "/duraark-storage/files/Plan3D_Haus30_PREVIEW.ifc",
    type: "ifc-spf",
    size: 21656908,
    directory: false,
    atime: "2015-07-30T16:16:10.000Z",
    mtime: "2015-07-30T16:16:15.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.384Z",
    updatedAt: "2015-08-02T09:00:41.042Z",
    id: 1,
    metadata: {}
  }, {
    path: "/duraark-storage/files/Plan3D_OG_subsampled.e57",
    type: "e57",
    size: 258907136,
    directory: false,
    atime: "2015-07-30T16:16:15.000Z",
    mtime: "2015-07-30T16:16:19.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.415Z",
    updatedAt: "2015-07-31T14:20:40.432Z",
    id: 2
  }]
}, {
  label: 'Nygade',

  physicalAssets: [],
  digitalObjects: [],

  // physicalAssets: [{
  //   label: 'Haus 30 Building Site',
  //   buildm: paMD
  // }],
  //
  // digitalObjects: [{
  //   label: 'Haus 30 BIM file',
  //   path: '/storage/1234-1234-1234-1234/digitalObjects/haus30.ifc',
  //   physicalAssets: [0],
  //   buildm: doMD,
  //   semMD: semMD,
  //   derivatives: []
  // }, {
  //   label: 'Haus 30 point cloud scan',
  //   path: '/storage/1234-1234-1234-1234/digitalObjects/haus30.e57',
  //   physicalAssets: [0],
  //   buildm: doMD,
  //   semMD: semMD,
  //   derivatives: derivatives
  // }],

  config: {
    sda: {
      topics: ["Nygade (general context)"]
    },
    geometricenrichment: {
      tools: ["IFC Reconstruction", "Electrical Appliance Detection"]
    }
  },

  fixedInputFiles: [{
    path: "/duraark-storage/files/Nygade_Scan1001.e57",
    type: "e57",
    size: 270408704,
    directory: false,
    atime: "2015-07-30T16:16:04.000Z",
    mtime: "2015-07-30T16:16:08.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.373Z",
    updatedAt: "2015-07-31T14:20:40.402Z",
    id: 1
  }, {
    path: "/duraark-storage/files/Nygade_Scan1001.ifc",
    type: "ifc-spf",
    size: 18194,
    directory: false,
    atime: "2015-07-30T16:16:08.000Z",
    mtime: "2015-07-30T16:16:10.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.378Z",
    updatedAt: "2015-08-02T09:00:34.781Z",
    id: 2
  }]
}];
