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

var sessions = [{
  state: 'wip',
  label: 'Haus 30',
  address: 'Haus30er Strasse, Berlin',
  description: 'Session documenting the renovation of the Haus30 in Berlin.',

  physicalAssets: [],
  digitalObjects: [],

  config: {
    sda: {
      topics: ["Haus 30 (general context)", "Haus 30 (political context)"]
    },
    geometricenrichment: {
      tools: ["IFC Reconstruction"]
    }
  },

  sessionFolder: "/duraark-storage/sessions/haus30-fixed",

  files: [{
    path: "/duraark-storage/sessions/haus30-fixed/master/Plan3D_Haus30_PREVIEW.ifc",
    type: "ifc-spf",
    size: 21656908,
    directory: false,
    atime: "2015-07-30T16:16:10.000Z",
    mtime: "2015-07-30T16:16:15.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.384Z",
    updatedAt: "2015-08-02T09:00:41.042Z",
    id: 1
  }, {
    path: "/duraark-storage/sessions/haus30-fixed/master/Plan3D_OG_subsampled.e57",
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
  state: 'archived',
  label: 'Nygade',
  address: 'Nygade Straat, Kopenhagen',
  description: 'Session documenting the renovation of the Nygade building.',

  physicalAssets: [],
  digitalObjects: [],

  config: {
    sda: {
      topics: ["Nygade (general context)"]
    },
    geometricenrichment: {
      tools: ["IFC Reconstruction", "Electrical Appliance Detection"]
    }
  },

  sessionFolder: "/duraark-storage/sessions/nygade1005-1006-fixed",

  files: [{
    path: "/duraark-storage/sessions/nygade1005-1006-fixed/master/Nygade_Scan1005-1006.e57",
    type: "e57",
    size: 538401792,
    directory: false,
    atime: "2015-07-30T16:16:04.000Z",
    mtime: "2015-07-30T16:16:08.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.373Z",
    updatedAt: "2015-07-31T14:20:40.402Z",
    id: 3
  }, {
    path: "/duraark-storage/sessions/nygade1005-1006-fixed/master/Nygade_Scan1005-1006.ifc",
    type: "ifc-spf",
    size: 54495,
    directory: false,
    atime: "2015-07-30T16:16:08.000Z",
    mtime: "2015-07-30T16:16:10.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.378Z",
    updatedAt: "2015-08-02T09:00:34.781Z",
    id: 4
  }]
}, {
  state: 'archived',
  label: 'Bygade 72',
  address: 'Somewhere, Kopenhagen',
  description: '2nd scan of the building',

  physicalAssets: [],
  digitalObjects: [],

  config: {
    sda: {
      topics: ["Haus 30 (general context)", "Haus 30 (political context)"]
    },
    geometricenrichment: {
      tools: ["IFC Reconstruction", "Electrical Appliance Detection"]
    }
  },

  sessionFolder: "/duraark-storage/sessions/byg72-2nd-scan_fixed",

  files: [{
    path: "/duraark-storage/sessions/byg72-2nd-scan_fixed/master/CITA_Byg72_2nd_Scan.e57",
    type: "ifc-spf",
    size: 1096586908,
    directory: false,
    atime: "2015-07-30T16:16:10.000Z",
    mtime: "2015-07-30T16:16:15.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.384Z",
    updatedAt: "2015-08-02T09:00:41.042Z",
    id: 5
  }]
}, {
  state: 'archived',
  label: 'Lyslab 03',
  address: 'Somewhere, Kopenhagen',
  description: 'Reconstruction',

  physicalAssets: [],
  digitalObjects: [],

  config: {
    sda: {
      topics: ["Haus 30 (general context)", "Haus 30 (political context)"]
    },
    geometricenrichment: {
      tools: ["IFC Reconstruction", "Electrical Appliance Detection"]
    }
  },

  sessionFolder: "/duraark-storage/sessions/lyslab_03-fixed",

  files: [{
    path: "/duraark-storage/sessions/lyslab_03-fixed/master/LysLab_Scan03.e57",
    type: "e57",
    size: 1071950848,
    directory: false,
    atime: "2015-07-30T16:16:10.000Z",
    mtime: "2015-07-30T16:16:15.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.384Z",
    updatedAt: "2015-08-02T09:00:41.042Z",
    id: 6
  }]
}, {
  state: 'archived',
  label: 'Nygade Scan37',
  address: 'Somewhere, Kopenhagen',
  description: 'Reconstruction',

  physicalAssets: [],
  digitalObjects: [],

  config: {
    sda: {
      topics: ["Haus 30 (general context)", "Haus 30 (political context)"]
    },
    geometricenrichment: {
      tools: ["IFC Reconstruction", "Electrical Appliance Detection"]
    }
  },

  sessionFolder: "/duraark-storage/sessions/nygade_037-fixed",

  files: [{
    path: "/duraark-storage/sessions/nygade_037-fixed/master/Nygade_Scan037.e57",
    type: "e57",
    size: 268553216,
    directory: false,
    atime: "2015-07-30T16:16:10.000Z",
    mtime: "2015-07-30T16:16:15.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.384Z",
    updatedAt: "2015-08-02T09:00:41.042Z",
    id: 7
  }]
}, {
  state: 'archived',
  label: 'Nygade 1001',
  address: 'Somewhere, Kopenhagen',
  description: 'Reconstruction',

  physicalAssets: [],
  digitalObjects: [],

  config: {
    sda: {
      topics: ["Haus 30 (general context)", "Haus 30 (political context)"]
    },
    geometricenrichment: {
      tools: ["IFC Reconstruction", "Electrical Appliance Detection"]
    }
  },

  sessionFolder: "/duraark-storage/sessions/nygade_1001-fixed",

  files: [{
    path: "/duraark-storage/sessions/nygade_1001-fixed/master/Nygade_Scan1001.e57",
    type: "e57",
    size: 270408704,
    directory: false,
    atime: "2015-07-30T16:16:10.000Z",
    mtime: "2015-07-30T16:16:15.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.384Z",
    updatedAt: "2015-08-02T09:00:41.042Z",
    id: 8
  }]
}, {
  state: 'archived',
  label: 'Nygade 1002',
  address: 'Somewhere, Kopenhagen',
  description: 'Reconstruction',

  physicalAssets: [],
  digitalObjects: [],

  config: {
    sda: {
      topics: ["Haus 30 (general context)", "Haus 30 (political context)"]
    },
    geometricenrichment: {
      tools: ["IFC Reconstruction", "Electrical Appliance Detection"]
    }
  },

  sessionFolder: "/duraark-storage/sessions/nygade_1002-fixed",

  files: [{
    path: "/duraark-storage/sessions/nygade_1002-fixed/master/Nygade_Scan1002.e57",
    type: "e57",
    size: 269388800,
    directory: false,
    atime: "2015-07-30T16:16:10.000Z",
    mtime: "2015-07-30T16:16:15.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.384Z",
    updatedAt: "2015-08-02T09:00:41.042Z",
    id: 9
  }]
}, {
  state: 'archived',
  label: 'Nygade 1005-1006',
  address: 'Somewhere, Kopenhagen',
  description: 'Reconstruction',

  physicalAssets: [],
  digitalObjects: [],

  config: {
    sda: {
      topics: ["Haus 30 (general context)", "Haus 30 (political context)"]
    },
    geometricenrichment: {
      tools: ["IFC Reconstruction", "Electrical Appliance Detection"]
    }
  },

  sessionFolder: "/duraark-storage/sessions/nygade_1005-1006-fixed",

  files: [{
    path: "/duraark-storage/sessions/nygade_1005-1006-fixed/master/Nygade_Scan1005-1006.e57",
    type: "e57",
    size: 538401792,
    directory: false,
    atime: "2015-07-30T16:16:10.000Z",
    mtime: "2015-07-30T16:16:15.000Z",
    ctime: "2015-07-30T16:18:51.000Z",
    createdAt: "2015-07-31T14:20:40.384Z",
    updatedAt: "2015-08-02T09:00:41.042Z",
    id: 10
  }]
}];
