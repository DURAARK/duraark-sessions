/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var _ = require('underscore');

module.exports.bootstrap = function(cb) {

	Sessions.find({
		name: 'Inffeldgasse 16c'
	}).exec(function(err, sessions) {
		console.log('seASDFASDFASDF: ' + JSON.stringify(sessions, null, 4));

		if (sessions.length) {
			console.log('Fixtures already in place, skipping creation.');
			return cb();
		} else {

			console.log('Creating fixtures ...');

			var _sessions = [{
				name: 'Inffeldgasse 16c',
				creator: 'Martin Hecher',
				created: new Date(),
				filestage: 0
			}, {
				name: 'Power Socket Scan',
				creator: 'Martin Hecher',
				created: new Date(),
				filestage: 1
			}];

			_.forEach(_sessions, function(session) {
				console.log('foreach: ' + session);
				Sessions.create(session).exec(function(err, record) {
					if (err) {
						console.log('err create: ' + err);
					} else {
						console.log('created: ' + JSON.stringify(record, null, 4));

						record.save(function(err) {
							if (err) {
								console.log('save err: ' + err);
							}
						});
					}
				});
			});

			console.log('   done');
		}

		// It's very important to trigger this callback method when you are finished
		// with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
		cb();
	});
};