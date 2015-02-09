/**
 * StagesController
 *
 * @description :: Server-side logic for managing stages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _stages = [{
    id: 0,
    type: 'files',
    model: {
        id: 0,
        files: [0, 3]
    }
}, {
    id: 1,
    type: 'metadata',
    model: {
        id: 1,
        enrichments: [0, 3]
    }
}, {
    id: 2,
    type: 'semantic-enrichment',
    model: {
        id: 1,
        enrichments: [0, 3]
    }
}, {
    id: 3,
    type: 'geometric-enrichment',
    model: {
        id: 1,
        enrichments: [0, 3]
    }
}, {
    id: 4,
    type: 'sip-generator',
    model: {
        id: 1,
        enrichments: [0, 3]
    }
}, {
    id: 5,
    type: 'files',
    model: {
        id: 0,
        files: [0, 3]
    }
}, {
    id: 6,
    type: 'metadata',
    model: {
        id: 1,
        enrichments: [0, 3]
    }
}, {
    id: 7,
    type: 'semantic-enrichment',
    model: {
        id: 1,
        enrichments: [0, 3]
    }
}, {
    id: 8,
    type: 'geometric-enrichment',
    model: {
        id: 1,
        enrichments: [0, 3]
    }
}, {
    id: 9,
    type: 'sip-generator',
    model: {
        id: 1,
        enrichments: [0, 3]
    }
}];

module.exports = {
    find: function(req, res, next) {
        res.send({
            stages: _stages
        });
    },

    findOne: function(req, res, next) {
    	var id = req.param('id');

        res.send({
            stage: _stages[id]
        });
    }    
};