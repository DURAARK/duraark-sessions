/**
 * FilestagesController
 *
 * @description :: Server-side logic for managing filestages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _filestages = [{
    id: 0,
    name: 'files',
    files: [0, 1],
    session: 0
}, {
    id: 1,
    name: 'files',
    files: [1],
    session: 1
}];

module.exports = {
    find: function(req, res, next) {
        res.send({
            filestages: _filestages
        });
    },

    findOne: function(req, res, next) {
        var id = req.param('id');

        if (id >= _filestages.length) {
            return res.send(500, 'Item with id "' + +'" is not available.');
        }

        res.send({
            filestage: _filestages[id]
        });
    },

    update: function(req, res, next) {
        var files = req.param('filestage');

        res.send(201, {
            files: files
        });
    }
};