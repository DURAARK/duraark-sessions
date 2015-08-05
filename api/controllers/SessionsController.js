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
    * @apiParam {Array} physicalAssets List of PhysicalAssets in the Session.
    * @apiParam {Array} digitalObjects List of DigitalObjects in the Session.
    * @apiParam {Object} config Configuration options for this Session to set available information topics and geometric enrichment tools.
    * @apiParam {Array} fixedInputFiles If present the WorkbenchUI will only display the files defined here. This allows to configure 'showcase' sessions.
    * @apiParam {Date} createdAt Creation date of the Session.
    * @apiParam {Date} modifiedAt date of the Session.
    * @apiParam {Number} ID of the Session.
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
    * @apiSuccess {String} label Display name of the Session.
    * @apiSuccess {Array} physicalAssets List of PhysicalAssets in the Session.
    * @apiSuccess {Array} digitalObjects List of DigitalObjects in the Session.
    * @apiSuccess {Object} config Configuration options for this Session to set available information topics and geometric enrichment tools.
    * @apiSuccess {Array} fixedInputFiles If present the WorkbenchUI will only display the files defined here. This allows to configure 'showcase' sessions.
    * @apiSuccess {Date} createdAt Creation date of the Session.
    * @apiSuccess {Date} modifiedAt date of the Session.
    * @apiSuccess {Number} ID of the Session.
    *
    */

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
