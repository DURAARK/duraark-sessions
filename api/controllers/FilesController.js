/**
 * FilesController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _storagePath = sails.config.storagePath;

module.exports = {
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

  /**
   * @api {get} /sessions/:id Request Session information
   * @apiName GetSession
   * @apiGroup Session
   * @apiVersion 0.6.0
   *
   * @apiParam {Number} id Session's unique ID.
   *
   * @apiSuccess {String} label Display name of the Session.
   * @apiSuccess {Array} physicalAssets List of PhysicalAssets in the Session.
   * @apiSuccess {Array} digitalObjects List of DigitalObjects in the Session.
   * @apiSuccess {Date} createdAt Creation date of the Session.
   * @apiSuccess {Date} modifiedAt date of the Session.
   * @apiSuccess {Number} ID of the Session.
   *
   * @apiUse SemanticMD
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "label": "Haus 30",
   *       "physicalAssets": [],
   *       "digitalObjects": [],
   *       "createdAt": [],
   *       "modifiedAt": [],
   *       "id": 1,
   *     }
   *
   * @apiError SessionNotFound The Session was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "SessionNotFound"
   *     }
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
};
