/**
 * SessionsController
 *
 * @description :: Server-side logic for managing filestages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/**
 * @apiDefine PhysicalAsset
 * @apiParam (PhysicalAsset) {String} label Display name of the PhysicalAsset.
 * @apiParam (PhysicalAsset) {Object} buildm JSON-LD object containing metadata
 *                                      about the PhysicalAsset as buildM schema instance.
 */

/**
 * @apiDefine DigitalObject
 * @apiParam (DigitalObject) {String} label Display name of the DigitalObject.
 * @apiParam (DigitalObject) {String} path Absolute path of file on the server.
 * @apiParam (DigitalObject) {Array} physicalAssets IDs of the PhysicalAssets this DigitalObject is related to.
 * @apiParam (DigitalObject) {Object} semMD SemanticMD instance storing information about the semantic enrichment process.
 * @apiParam (DigitalObject) {Array} derivatives DigitalObject instances which were created in the geometric enrichment process.
 */

/**
 * @apiDefine SemanticMD
 * @apiSuccess (SemanticMD) {Array} topics List of Topics containing a set of semantic links that specify an information context.
 * @apiSuccess (SemanticMD) {Array} candidates List of semantic links related to a Topic.
 * @apiSuccess (SemanticMD) {Array} selections List of semantic links which will be connected to the DigitalObject in the SDAS knowledge graph.
 */

var path = require('path'),
  fs = require('fs-extra');

module.exports = {
  /**
   * @api {get} /sessions/:id Request Session
   * @apiVersion 0.7.0
   * @apiName GetSession
   * @apiGroup Session
   * @apiPermission none
   *
   * @apiDescription Requests a Session stored on the server.
   *
   * @apiParam {Number} id Session's unique ID.
   *
   * @apiExample {curl} Example usage:
   * curl -i http://data.duraark.eu/services/api/sessions/sessions/1
   *
   * @apiSuccess {String} label Display name of the Session.
   * @apiSuccess {Array} physicalAssets List of PhysicalAssets in the Session.
   * @apiSuccess {Array} digitalObjects List of DigitalObjects in the Session.
   * @apiSuccess {Object} config Configuration options for this Session to set available information topics and geometric enrichment tools.
   * @apiSuccess {Array} fixedInputFiles If present the WorkbenchUI will only display the files defined here. This allows to configure 'showcase' sessions.
   * @apiSuccess {Date} createdAt Creation date of the Session.
   * @apiSuccess {Date} modifiedAt date of the Session.
   * @apiSuccess {Number} ID of the Session.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "label": "Haus 30",
   *       "physicalAssets": [],
   *       "digitalObjects": [],
   *       "config": [],
   *       "fixedInputFiles": [],
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

  /**
   * @api {post} /sessions Create Session
   * @apiVersion 0.7.0
   * @apiName PostSession
   * @apiGroup Session
   * @apiPermission none
   *
   * @apiDescription Creates a new Session on the server.
   *
   * @apiParam {String} label Display name of the Session.
   * @apiParam {String} address Address of the building worked on in the Session.
   * @apiParam {String} description Description of the Session.
   * @apiParam {String} files An array of 'files' which will be moved to the session folder from the 'uploads' folder. The files have to exist in the 'uploads' folder before creating the session, otherwise an error will be thrown.
   * @apiParam {Object} config Optional configuration options for this Session. Via the 'topics' object you can filter the enable only a set of the available enrichment topics. Via the 'geoTools' array you can enable only a set of available geometric tools.
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
   * @apiSuccess {Date} createdAt Creation date of the Session.
   * @apiSuccess {Date} modifiedAt date of the Session.
   * @apiSuccess {Number} ID of the Session.
   *
   */
  create: function(req, res, next) {
    var initialSessionData = req.body;

    console.log('Requesting new session for: ' + initialSessionData.label);

    // FIXXME: make independent from 'res'!
    Duraark.createSession(res, initialSessionData);
  },

  // FIXXME: find correct blueprint name!
  remove: function(req, res, next) {
    var session = {}; // FIXXME!
    Duraark.deleteSession(res, session);
  },

  addFilesToSession: function(req, res, next) {
    var sessionId = req.param('sessionId'),
      files = req.param('files');

    Sessions.findOne(sessionId).then(function(session) {
      if (!session) {
        res.send('No session with ID ' + sessionId + ' found.').status(500);
      }

      // console.log('session: ' + JSON.stringify(session, null, 4));
      // console.log('files: ' + JSON.stringify(files, null, 4));

      // FIXXME: use Promise.all()!
      var numFiles = files.length,
        fileCounter = 0;

      _.forEach(files, function(file) {
        var filename = file.path.split('/').pop(),
          target = path.join(session.sessionFolder, 'master', filename);

        fs.move(file.path, target, function(err) {
          if (err) {
            res.send('Error adding file ' + file.path + ' to session. Did you upload the file correctly?\n\nDetailes error: ' + err);
          }
          var fileInfo = FileService.getFileStats(target);
          session.files.push(fileInfo);

          console.log('Added file to session: ' + fileInfo.path);

          // TODO: extract metadata already here and trigger potree processing, etc.!

          fileCounter++;

          if (numFiles === fileCounter) {
            session.save().then(function(sessionRecord) {
              res.send(sessionRecord).status(200);
            });
          }
        });
      });

      console.log('sessionFolder: ' + session.sessionFolder);
      // console.log('files: ' + JSON.stringify(files, null, 4));
    });
  }

  //  find: function(req, res, next) {
  //    var files = FileService.getFileList({
  //        path: _storagePath
  //    });
  //
  //    _.forEach(files, function(item, idx) {
  //      item.id = idx;
  //    });
  //
  //    res.send(files).status(200);
  //  }
}
