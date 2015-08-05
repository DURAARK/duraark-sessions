define({ "api": [
  {
    "type": "get",
    "url": "/files/:id",
    "title": "Request File",
    "version": "0.7.0",
    "name": "GetFile",
    "group": "File",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Requests a File stored on the server.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>File's unique ID.</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://data.duraark.eu/services/api/sessions/files/1",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"path\": \"/duraark-storage/files/Nygade_Scan1001.e57\",\n   \"type\": \"e57\",\n   \"size\": 270408704,\n   \"directory\": false,\n   \"atime\": \"2015-08-04T19:01:46.000Z\",\n   \"mtime\": \"2015-07-30T16:16:08.000Z\",\n   \"ctime\": \"2015-07-30T16:18:51.000Z\",\n   \"createdAt\": \"2015-08-05T15:20:24.963Z\",\n   \"updatedAt\": \"2015-08-05T15:20:25.005Z\",\n   \"id\": 1\n }",
          "type": "json"
        }
      ],
      "fields": {
        "File": [
          {
            "group": "File",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "path",
            "description": "<p>Location of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the File ('e57' or 'ifc-spf').</p> "
          },
          {
            "group": "File",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "size",
            "description": "<p>Size of the File in byte.</p> "
          },
          {
            "group": "File",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "directory",
            "description": "<p>True, if a directory, otherwise false.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "atime",
            "description": "<p>Last access time of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "mtime",
            "description": "<p>Last modification time of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "ctime",
            "description": "<p>Creation time of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Creation time of the database instance.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Last modification time of the database instance.</p> "
          },
          {
            "group": "File",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>Database instance's unique ID.</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The File was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\nNot Found",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/FilesController.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "http://data.duraark.eu/services/api/sessions/files/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/files",
    "title": "Create File",
    "version": "0.7.0",
    "name": "PostFile",
    "group": "File",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Creates a new File on the server.</p> ",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"path\": \"/duraark-storage/files/Nygade_Scan1001.e57\",\n   \"type\": \"e57\",\n   \"size\": 270408704,\n   \"directory\": false,\n   \"atime\": \"2015-08-04T19:01:46.000Z\",\n   \"mtime\": \"2015-07-30T16:16:08.000Z\",\n   \"ctime\": \"2015-07-30T16:18:51.000Z\",\n   \"createdAt\": \"2015-08-05T15:20:24.963Z\",\n   \"updatedAt\": \"2015-08-05T15:20:25.005Z\",\n   \"id\": 1\n }",
          "type": "json"
        }
      ],
      "fields": {
        "File": [
          {
            "group": "File",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "path",
            "description": "<p>Location of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the File ('e57' or 'ifc-spf').</p> "
          },
          {
            "group": "File",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "size",
            "description": "<p>Size of the File in byte.</p> "
          },
          {
            "group": "File",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "directory",
            "description": "<p>True, if a directory, otherwise false.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "atime",
            "description": "<p>Last access time of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "mtime",
            "description": "<p>Last modification time of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "ctime",
            "description": "<p>Creation time of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Creation time of the database instance.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Last modification time of the database instance.</p> "
          },
          {
            "group": "File",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>Database instance's unique ID.</p> "
          }
        ]
      }
    },
    "filename": "api/controllers/FilesController.js",
    "groupTitle": "File",
    "sampleRequest": [
      {
        "url": "http://data.duraark.eu/services/api/sessions/files"
      }
    ],
    "parameter": {
      "fields": {
        "File": [
          {
            "group": "File",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "path",
            "description": "<p>Location of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the File ('e57' or 'ifc-spf').</p> "
          },
          {
            "group": "File",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "size",
            "description": "<p>Size of the File in byte.</p> "
          },
          {
            "group": "File",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "directory",
            "description": "<p>True, if a directory, otherwise false.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "atime",
            "description": "<p>Last access time of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "mtime",
            "description": "<p>Last modification time of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "ctime",
            "description": "<p>Creation time of the File.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Creation time of the database instance.</p> "
          },
          {
            "group": "File",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Last modification time of the database instance.</p> "
          },
          {
            "group": "File",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>Database instance's unique ID.</p> "
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/sessions/:id",
    "title": "Request Session",
    "version": "0.7.0",
    "name": "GetSession",
    "group": "Session",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Requests a Session stored on the server.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>Session's unique ID.</p> "
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://data.duraark.eu/services/api/sessions/sessions/1",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "label",
            "description": "<p>Display name of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "physicalAssets",
            "description": "<p>List of PhysicalAssets in the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "digitalObjects",
            "description": "<p>List of DigitalObjects in the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "config",
            "description": "<p>Configuration options for this Session to set available information topics and geometric enrichment tools.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "fixedInputFiles",
            "description": "<p>If present the WorkbenchUI will only display the files defined here. This allows to configure 'showcase' sessions.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Creation date of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "modifiedAt",
            "description": "<p>date of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "ID",
            "description": "<p>of the Session.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"label\": \"Haus 30\",\n  \"physicalAssets\": [],\n  \"digitalObjects\": [],\n  \"config\": [],\n  \"fixedInputFiles\": [],\n  \"createdAt\": [],\n  \"modifiedAt\": [],\n  \"id\": 1,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The Session was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\nNot Found",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/SessionsController.js",
    "groupTitle": "Session",
    "sampleRequest": [
      {
        "url": "http://data.duraark.eu/services/api/sessions/sessions/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/sessions",
    "title": "Create Session",
    "version": "0.7.0",
    "name": "PostSession",
    "group": "Session",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Creates a new Session on the server.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "label",
            "description": "<p>Display name of the Session.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "physicalAssets",
            "description": "<p>List of PhysicalAssets in the Session.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "digitalObjects",
            "description": "<p>List of DigitalObjects in the Session.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "config",
            "description": "<p>Configuration options for this Session to set available information topics and geometric enrichment tools.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "fixedInputFiles",
            "description": "<p>If present the WorkbenchUI will only display the files defined here. This allows to configure 'showcase' sessions.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Creation date of the Session.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "modifiedAt",
            "description": "<p>date of the Session.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "ID",
            "description": "<p>of the Session.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"label\": \"Haus 30\",\n  \"physicalAssets\": [],\n  \"digitalObjects\": [],\n  \"config\": [],\n  \"fixedInputFiles\": [],\n  \"createdAt\": [],\n  \"modifiedAt\": [],\n  \"id\": 1,\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "label",
            "description": "<p>Display name of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "physicalAssets",
            "description": "<p>List of PhysicalAssets in the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "digitalObjects",
            "description": "<p>List of DigitalObjects in the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "config",
            "description": "<p>Configuration options for this Session to set available information topics and geometric enrichment tools.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "fixedInputFiles",
            "description": "<p>If present the WorkbenchUI will only display the files defined here. This allows to configure 'showcase' sessions.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Creation date of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "modifiedAt",
            "description": "<p>date of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "ID",
            "description": "<p>of the Session.</p> "
          }
        ]
      }
    },
    "filename": "api/controllers/SessionsController.js",
    "groupTitle": "Session",
    "sampleRequest": [
      {
        "url": "http://data.duraark.eu/services/api/sessions/sessions"
      }
    ]
  }
] });