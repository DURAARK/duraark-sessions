/**
 * Filestages.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: 'string',
        physicalAssets: 'array',
        digitalObjects: 'array',
        ifcms: 'array',  
        e57ms: 'array',	
        session: {
            model: 'sessions'
        }
    }
};