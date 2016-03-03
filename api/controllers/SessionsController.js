/**
 * SessionsController
 *
 * @description :: Server-side logic for managing filestages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var path = require('path'),
  fs = require('fs-extra');

module.exports = {
  /**
   * @api {post} /sessions Create new Session
   * @apiVersion 1.0.0
   * @apiName PostSession
   * @apiGroup Session
   * @apiPermission none
   *
   * @apiDescription Creates a new Session on the server. A session represents a 'building' the user is working on.
   * It contains files and metadata related to a building. After the initial creation the session is empty, no files
   * are associated with it yet. You can use the <a href="#api-Session-PostUploadFiles"><strong>Upload file(s)</strong></a> in
   * combination with <a href="#api-Session-PostUploadFiles"><strong>Add file(s) to Session</strong></a> to add
   * files to a session. Alternatively the Workbench web application allows to upload files in a graphical way (which is using this
   * API in the background).
   *
   * @apiParam {String} label Display name of the Session.
   * @apiParam {String} address (Optional) Address of the building worked on in the Session.
   * @apiParam {String} description (Optional) Description of the Session.
   * @apiParam {String} files (Optional) An array of 'files' which will be moved to the session folder from the 'uploads' folder. The files have to exist in the 'uploads' folder before creating the session, otherwise an error will be thrown.
   * @apiParam {Object} config (Optional) Configuration options for this Session. Via the 'topics' object you can filter the enable only a set of the available enrichment topics. Via the 'geoTools' array you can enable only a set of available geometric tools.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "label": "Inffeldgasse",
   *       "address": "Inffeldgasse 16c",
   *       "description": "Home of FhA",
   *       "physicalAssets": [],
   *       "digitalObjects": [],
   *       "config": [],
   *       "files": [],
   *       "sessionFolder": "/duraark-storage/sessions/duraark-session-651982aa-143b-484a-a1ed-090aab9427e4",
   *       "url": "/preingest/22/files",
   *       "createdAt": [],
   *       "modifiedAt": [],
   *       "id": 1,
   *     }
   *
   * @apiSuccess {String} label Display name of the Session.
   * @apiSuccess {String} address Address of the building worked on in the Session.
   * @apiSuccess {String} description Description of the Session.
   * @apiSuccess {Object} config Optional configuration options for this Session. Via the 'topics' object you can filter the enable only a set of the available enrichment topics. Via the 'geoTools' array you can enable only a set of available geometric tools.
   * @apiSuccess {Array} physicalAssets List of PhysicalAssets in the Session.
   * @apiSuccess {Array} digitalObjects List of DigitalObjects in the Session.
   * @apiSuccess {String} files An array of 'files' which are part of the Session.
   * @apiSuccess {String} sessionFolder The name of the session folder where master, derivative and tmp files are stored.
   * @apiSuccess {String} url URL linking to the Session in the Workbench. Replace '/files' with the entrypoint that suits you, i.e. '/metadata', '/geometricenrichment', '/semanticenrichment' or '/digitalpreservation'.
   * @apiSuccess {Date} createdAt Creation date of the Session.
   * @apiSuccess {Date} modifiedAt date of the Session.
   * @apiSuccess {Number} ID of the Session.
   *
   */
  create: function(req, res, next) {
    var initialSessionData = req.body;

    console.log('[duraark-sessions] POST /sessions\n ' + JSON.stringify(req.body, null, 4));

    // FIXXME: make independent from 'res'!
    Duraark.createSession(res, initialSessionData, true);
  },

  /**
   * @api {get} /sessions/:id Get Session
   * @apiVersion 1.0.0
   * @apiName GetSession
   * @apiGroup Session
   * @apiPermission none
   *
   * @apiDescription A session contains files and metadata related to a building, as well as other session state.
   * Requesting a sessions returns all that data. The 'Edit Building' section in the Workbench web application is
   * using and manipulating this session data. Eventually the data is persisted into the long-term archive via the
   * <a href="/api/v0.7/digitalpreservation"><strong>duraark-digitalpreservation</strong></a> service.
   *
   * @apiParam {Number} id Session's unique ID.
   *
   * @apiExample {curl} Example usage:
   * curl -i http://data.duraark.eu/services/api/sessions/sessions/1
   *
   * @apiSuccess {String} label Display name of the Session.
   * @apiSuccess {String} address Address of the building worked on in the Session.
   * @apiSuccess {String} description Description of the Session.
   * @apiSuccess {Object} config Optional configuration options for this Session. Via the 'topics' object you can filter the enable only a set of the available enrichment topics. Via the 'geoTools' array you can enable only a set of available geometric tools.
   * @apiSuccess {Array} physicalAssets List of PhysicalAssets in the Session.
   * @apiSuccess {Array} digitalObjects List of DigitalObjects in the Session.
   * @apiSuccess {String} files An array of 'files' which are part of the Session.
   * @apiSuccess {String} sessionFolder The name of the session folder where master, derivative and tmp files are stored.
   * @apiSuccess {String} url URL linking to the Session in the Workbench. Replace '/files' with the entrypoint that suits you, i.e. '/metadata', '/geometricenrichment', '/semanticenrichment' or '/digitalpreservation'.
   * @apiSuccess {Date} createdAt Creation date of the Session.
   * @apiSuccess {Date} modifiedAt date of the Session.
   * @apiSuccess {Number} ID of the Session.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "label": "Inffeldgasse",
   *       "address": "Inffeldgasse 16c",
   *       "description": "Home of FhA",
   *       "physicalAssets": [],
   *       "digitalObjects": [],
   *       "config": [],
   *       "files": [],
   *       "sessionFolder": "/duraark-storage/sessions/duraark-session-651982aa-143b-484a-a1ed-090aab9427e4",
   *       "url": "/preingest/22/files",
   *       "createdAt": [],
   *       "modifiedAt": [],
   *       "id": 1,
   *     }
   *
   * @apiError NotFound The Session was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     Not Found
   *
   */

  // FIXXME: find correct blueprint name!
  remove: function(req, res, next) {
    var session = {}; // FIXXME!
    Duraark.deleteSession(res, session);
  },

  /**
   * @api {post} /sessions/addFilesToSession Add file(s) to Session
   * @apiVersion 1.0.0
   * @apiName PostAddFilesToSession
   * @apiGroup Session
   * @apiPermission none
   *
   * @apiDescription Files which were uploaded in <a href="#api-Session-uploadFiles"><strong>Upload file(s)</strong></a> have to be added to a
   * session to be usable in the Workbench. The output of a file upload described in <a href="#api-Session-uploadFiles"><strong>Upload file(s)</strong></a>
   * can directly be used as input for the 'files' parameter of this endpoint. If the files are successfully added to a session the response contains
   * amongst other data an 'url' parameter. This URL can be visited to work with the added files in the Workbench. The default URL links to the 'files'
   * section in the Workbench. Change the link to fit your needs (see the <strong>Success</strong> description below for options).
   *
   * @apiParam {Number} id Session's unique ID.
   * @apiParam {Array} files An array with filepaths as returned by <a href="#api-Session-PostUploadFiles">the upload endpoint</a>.
   *
   *
   * @apiSuccess {String} label Display name of the Session.
   * @apiSuccess {String} address Address of the building worked on in the Session.
   * @apiSuccess {String} description Description of the Session.
   * @apiSuccess {Object} config Optional configuration options for this Session. Via the 'topics' object you can filter the enable only a set of the available enrichment topics. Via the 'geoTools' array you can enable only a set of available geometric tools.
   * @apiSuccess {Array} physicalAssets List of PhysicalAssets in the Session.
   * @apiSuccess {Array} digitalObjects List of DigitalObjects in the Session.
   * @apiSuccess {String} files An array of 'files' which are part of the Session.
   * @apiSuccess {String} sessionFolder The name of the session folder where master, derivative and tmp files are stored.
   * @apiSuccess {String} url URL linking to the Session in the Workbench. Replace '/files' with the entrypoint that suits you, i.e. '/metadata', '/geometricenrichment', '/semanticenrichment' or '/digitalpreservation'.
   * @apiSuccess {Date} createdAt Creation date of the Session.
   * @apiSuccess {Date} modifiedAt date of the Session.
   * @apiSuccess {Number} ID of the Session.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "label": "Inffeldgasse",
   *       "address": "Inffeldgasse 16c",
   *       "description": "Home of FhA",
   *       "physicalAssets": [],
   *       "digitalObjects": [],
   *       "config": [],
   *       "files": [{
   *          "path": "/duraark-storage/sessions/duraark-session-651982aa-143b-484a-a1ed-090aab9427e4/master/Plan3D_Haus30_PREVIEW.ifc",
   *            "type": "ifc-spf",
   *            "directory": false,
   *            "size": 21656908,
   *            "mtime": null,
   *            "atime": null,
   *            "ctime": null
   *          }],
   *       "sessionFolder": "/duraark-storage/sessions/duraark-session-651982aa-143b-484a-a1ed-090aab9427e4",
   *       "url": "/preingest/22/files",
   *       "createdAt": [],
   *       "modifiedAt": [],
   *       "id": 1,
   *     }
   */
  addFilesToSession: function(req, res, next) {
    var sessionId = req.param('sessionId'),
      files = req.param('files');

    Duraark.addFilesToSession(res, sessionId, files);
  },

  fixxmeSaveSession: function(req, res, next) {
    var session = req.body;
    Sessions.update(session.id, session).exec(function(err, updated) {
      if (err) {
        console.log(err);
        return res.send(err).status(500);
      }
      res.send(updated).status(200);
    });
  }
}
