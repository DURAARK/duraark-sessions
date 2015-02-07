/**
 * SessionsController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function(req, res, next) {
		res.send({
			sessions: [{
				id: 0,
				name: 'Inffeldgasse 16c',
				creator: 'Martin Hecher',
				created: new Date(),
				stages: [0, 1, 2, 3, 4]
			},{
				id: 1,
				name: 'Power Socket Scan',
				creator: 'Martin Hecher',
				created: new Date(),
				stages: [0, 1, 2, 3, 4]
			}]
		});
	}
};