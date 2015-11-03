define({ "api": [
  {
    "type": "get",
    "url": "/sessions/:id",
    "title": "Get Session",
    "version": "0.8.0",
    "name": "GetSession",
    "group": "Session",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>A session contains files and metadata related to a building, as well as other session state. Requesting a sessions returns all that data. The 'Edit Building' section in the Workbench web application is using and manipulating this session data. Eventually the data is persisted into the long-term archive via the <a href=\"/api/v0.7/digitalpreservation\"><strong>duraark-digitalpreservation</strong></a> service.</p> ",
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
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the building worked on in the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "config",
            "description": "<p>Optional configuration options for this Session. Via the 'topics' object you can filter the enable only a set of the available enrichment topics. Via the 'geoTools' array you can enable only a set of available geometric tools.</p> "
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
            "type": "<p>String</p> ",
            "optional": false,
            "field": "files",
            "description": "<p>An array of 'files' which are part of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "sessionFolder",
            "description": "<p>The name of the session folder where master, derivative and tmp files are stored.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "url",
            "description": "<p>URL linking to the Session in the Workbench. Replace '/files' with the entrypoint that suits you, i.e. '/metadata', '/geometricenrichment', '/semanticenrichment' or '/digitalpreservation'.</p> "
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
          "content": "HTTP/1.1 200 OK\n{\n  \"label\": \"Inffeldgasse\",\n  \"address\": \"Inffeldgasse 16c\",\n  \"description\": \"Home of FhA\",\n  \"physicalAssets\": [],\n  \"digitalObjects\": [],\n  \"config\": [],\n  \"files\": [],\n  \"sessionFolder\": \"/duraark-storage/sessions/duraark-session-651982aa-143b-484a-a1ed-090aab9427e4\",\n  \"url\": \"/preingest/22/files\",\n  \"createdAt\": [],\n  \"modifiedAt\": [],\n  \"id\": 1,\n}",
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
    "groupTitle": "Session"
  },
  {
    "type": "post",
    "url": "/sessions/addFilesToSession",
    "title": "Add file(s) to Session",
    "version": "0.8.0",
    "name": "PostAddFilesToSession",
    "group": "Session",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Files which were uploaded in <a href=\"/#api-Session-uploadFiles\"><strong>Upload file(s)</strong></a> have to be added to a session to be usable in the Workbench. The output of a file upload described in <a href=\"/#api-Session-uploadFiles\"><strong>Upload file(s)</strong></a> can directly be used as input for the 'files' parameter of this endpoint. If the files are successfully added to a session the response contains amongst other data an 'url' parameter. This URL can be visited to work with the added files in the Workbench. The default URL links to the 'files' section in the Workbench. Change the link to fit your needs (see the <strong>Success</strong> description below for options).</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>Session's unique ID.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "files",
            "description": "<p>An array with filepaths as returned by <a href=\"#api-Session-PostUploadFiles\">the upload endpoint</a>.</p> "
          }
        ]
      }
    },
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
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the building worked on in the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "config",
            "description": "<p>Optional configuration options for this Session. Via the 'topics' object you can filter the enable only a set of the available enrichment topics. Via the 'geoTools' array you can enable only a set of available geometric tools.</p> "
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
            "type": "<p>String</p> ",
            "optional": false,
            "field": "files",
            "description": "<p>An array of 'files' which are part of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "sessionFolder",
            "description": "<p>The name of the session folder where master, derivative and tmp files are stored.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "url",
            "description": "<p>URL linking to the Session in the Workbench. Replace '/files' with the entrypoint that suits you, i.e. '/metadata', '/geometricenrichment', '/semanticenrichment' or '/digitalpreservation'.</p> "
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
          "content": "HTTP/1.1 200 OK\n{\n  \"label\": \"Inffeldgasse\",\n  \"address\": \"Inffeldgasse 16c\",\n  \"description\": \"Home of FhA\",\n  \"physicalAssets\": [],\n  \"digitalObjects\": [],\n  \"config\": [],\n  \"files\": [{\n     \"path\": \"/duraark-storage/sessions/duraark-session-651982aa-143b-484a-a1ed-090aab9427e4/master/Plan3D_Haus30_PREVIEW.ifc\",\n       \"type\": \"ifc-spf\",\n       \"directory\": false,\n       \"size\": 21656908,\n       \"mtime\": null,\n       \"atime\": null,\n       \"ctime\": null\n     }],\n  \"sessionFolder\": \"/duraark-storage/sessions/duraark-session-651982aa-143b-484a-a1ed-090aab9427e4\",\n  \"url\": \"/preingest/22/files\",\n  \"createdAt\": [],\n  \"modifiedAt\": [],\n  \"id\": 1,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/SessionsController.js",
    "groupTitle": "Session"
  },
  {
    "type": "post",
    "url": "/sessions",
    "title": "Create new Session",
    "version": "0.8.0",
    "name": "PostSession",
    "group": "Session",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Creates a new Session on the server. A session represents a 'building' the user is working on. It contains files and metadata related to a building. After the initial creation the session is empty, no files are associated with it yet. You can use the <a href=\"#api-Session-PostUploadFiles\"><strong>Upload file(s)</strong></a> in combination with <a href=\"#api-Session-PostUploadFiles\"><strong>Add file(s) to Session</strong></a> to add files to a session. Alternatively the Workbench web application allows to upload files in a graphical way (which is using this API in the background).</p> ",
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
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>(Optional) Address of the building worked on in the Session.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>(Optional) Description of the Session.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "files",
            "description": "<p>(Optional) An array of 'files' which will be moved to the session folder from the 'uploads' folder. The files have to exist in the 'uploads' folder before creating the session, otherwise an error will be thrown.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "config",
            "description": "<p>(Optional) Configuration options for this Session. Via the 'topics' object you can filter the enable only a set of the available enrichment topics. Via the 'geoTools' array you can enable only a set of available geometric tools.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"label\": \"Inffeldgasse\",\n  \"address\": \"Inffeldgasse 16c\",\n  \"description\": \"Home of FhA\",\n  \"physicalAssets\": [],\n  \"digitalObjects\": [],\n  \"config\": [],\n  \"files\": [],\n  \"sessionFolder\": \"/duraark-storage/sessions/duraark-session-651982aa-143b-484a-a1ed-090aab9427e4\",\n  \"url\": \"/preingest/22/files\",\n  \"createdAt\": [],\n  \"modifiedAt\": [],\n  \"id\": 1,\n}",
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
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the building worked on in the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "config",
            "description": "<p>Optional configuration options for this Session. Via the 'topics' object you can filter the enable only a set of the available enrichment topics. Via the 'geoTools' array you can enable only a set of available geometric tools.</p> "
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
            "type": "<p>String</p> ",
            "optional": false,
            "field": "files",
            "description": "<p>An array of 'files' which are part of the Session.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "sessionFolder",
            "description": "<p>The name of the session folder where master, derivative and tmp files are stored.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "url",
            "description": "<p>URL linking to the Session in the Workbench. Replace '/files' with the entrypoint that suits you, i.e. '/metadata', '/geometricenrichment', '/semanticenrichment' or '/digitalpreservation'.</p> "
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
    "groupTitle": "Session"
  },
  {
    "type": "post",
    "url": "/uploads/upload",
    "title": "Upload file(s)",
    "version": "0.8.0",
    "name": "PostUploadFiles",
    "group": "Session",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>To work with files in a session you have to upload them to the system first. DURAARK provides an upload functionality to do that via this endpoint. A file is first uploaded to the server but is not yet added to a session. To add it to a session use <a href=\"/#api-Session-addFilesToSession\"><strong>Add file(s) to Session</strong></a>. The response from a successful upload can directly be used as input for the <a href=\"/#api-Session-addFilesToSession\"><strong>Add file(s) to Session</strong></a> functionality.</p> ",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -F file=@/tmp/Nygade_Scan1005-1006.ifc http://localhost/api/v0.7/sessions/uploads/upload",
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
            "field": "path",
            "description": "<p>The path where the file is stored after the upload. Use this filepath as reference when adding the file to an existing sessions (see <a href=\"#api-Session-PostAddFilesToSession\">Add file(s) to Session</a>)</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "size",
            "description": "<p>The file size of the uploaded file.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "atime",
            "description": "<p>Last access time of the file.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "mtime",
            "description": "<p>Last modification time of the file.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ctime",
            "description": "<p>Creation time of the file.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"files\": [{\n \"path\": \"/duraark-storage/uploads/upload-3d1d06ac-a5ab-46e6-ab47-dc9e76c1ab75/Nygade_Scan1005-1006.ifc\",\n   \"type\": \"ifc-spf\",\n   \"size\": 54495,\n   \"atime\": \"2015-11-03T11:08:24.480Z\",\n   \"mtime\": \"2015-11-03T11:08:24.480Z\",\n   \"ctime\": \"2015-11-03T11:08:24.480Z\"\n }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/UploadsController.js",
    "groupTitle": "Session"
  }
] });