/**
 * SessionsController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _sessions = [{
    id: 0,
    name: 'Inffeldgasse 16c',
    creator: 'Martin Hecher',
    created: new Date(),
    filestage: 0
}, {
    id: 1,
    name: 'Power Socket Scan',
    creator: 'Martin Hecher',
    created: new Date(),
    filestage: 1
}];

module.exports = {
    find: function(req, res, next) {
        res.send({
            sessions: _sessions
        });
    },

    findOne: function(req, res, next) {
        var id = req.param('id');

        if (id >= _sessions.length) {
            return res.send(500, 'Item with id "' + +'" is not available.');
        }

        res.send({
            session: _sessions[id]
        });
    }
};