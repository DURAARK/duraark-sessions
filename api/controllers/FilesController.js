/**
 * FilesController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function(req, res, next) {
		res.send({
			file: [{
				id: 0,
				path: '/storage/test.ifc',
				directory: false,
				size: 2048,
				mtime: new Date(),
				atime: new Date(),
				ctime: new Date()
			}, {
				id: 1,
				path: '/storage/test.e57',
				directory: false,
				size: 20048,
				mtime: new Date(),
				atime: new Date(),
				ctime: new Date()
			}, {
				id: 3,
				path: '/storage/building1.ifc',
				directory: false,
				size: 2048,
				mtime: new Date(),
				atime: new Date(),
				ctime: new Date()
			}, {
				id: 4,
				path: '/storage/building1.e57',
				directory: false,
				size: 20048,
				mtime: new Date(),
				atime: new Date(),
				ctime: new Date()
			}]
		});
	}
};