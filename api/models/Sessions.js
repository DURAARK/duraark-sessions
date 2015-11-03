/**
 * Sessions.js
 *
 * @description :: 'Session' model definition
 */

module.exports = {
	attributes: {
		label: 'string',
		address: 'string',
		description: 'string',
		config: 'object',
		physicalAssets: 'array',
		digitalObjects: 'array',
		files: 'array',
		sessionFolder: 'string',
		url: 'string'
	}
};
