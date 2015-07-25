define({ "api": [
  {
    "type": "get",
    "url": "/sessions/:id",
    "title": "Request Session information",
    "name": "GetSession",
    "group": "Session",
    "version": "0.6.0",
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
        ],
        "": [
          {
            "group": "SemanticMD",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "topics",
            "description": "<p>List of Topics containing a set of semantic links that specify an information context.</p> "
          },
          {
            "group": "SemanticMD",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "candidates",
            "description": "<p>List of semantic links related to a Topic.</p> "
          },
          {
            "group": "SemanticMD",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "selections",
            "description": "<p>List of semantic links which will be connected to the DigitalObject in the SDAS knowledge graph.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"label\": \"Haus 30\",\n  \"physicalAssets\": [],\n  \"digitalObjects\": [],\n  \"createdAt\": [],\n  \"modifiedAt\": [],\n  \"id\": 1,\n}",
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
            "field": "SessionNotFound",
            "description": "<p>The Session was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"SessionNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/FilesController.js",
    "groupTitle": "Session"
  }
] });