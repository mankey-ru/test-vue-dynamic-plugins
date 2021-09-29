module.exports = {
	mode: 'production',
	devtool: 'source-map',
	output: {
		path: `${__dirname}/dist`,
		filename: '[name].system.js',
		libraryTarget: 'system',
	},
	// optimization: {},
	entry: {
		pluginManager: [`${__dirname}/pluginManager.src.js`],
	},
};
