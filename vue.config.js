module.exports = {
	chainWebpack: (config) => config.optimization.minimize(false),
	configureWebpack: function (CFG) {
		// CFG.output.libraryExport = 'default';
		CFG.output.filename = 'js/[name].js';
		CFG.output.chunkFilename = 'js/[name].js';
		CFG.optimization.concatenateModules = false;
		// fs.writeFileSync('---EFFECTIVE_CONFIG---.js', JSON.stringify(CFG, null, '\t'))
	},
};
