/**
 * Files.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
      technicalMetdata: {
        type: 'string'
      },

      digitalObjectMetadata: {
        type: 'string'
      },

      derivatives: {
        type: 'derivative'
      }
  }

    // attributes: {
    //     path: 'string',
    //     type: 'string',
    //     size: 'integer',
    //     atime: 'date',
    //     mtime: 'date',
    //     ctime: 'date'
    // }

};
