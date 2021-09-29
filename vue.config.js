module.exports = {
	filenameHashing: false,
	// chainWebpack: (config) => config.optimization.minimize(false),
	publicPath: '/',
	configureWebpack: function (CFG) {
		// CFG.output.libraryExport = 'default';
		// CFG.output.filename = 'js/[name].js'; // то же что filenameHashing
		// CFG.output.chunkFilename = 'js/[name].js';
		// CFG.optimization.concatenateModules = false;
		// require('fs').writeFileSync('dist/EFFECTIVE_CONFIG.js', JSON.stringify(CFG, null, '\t'));

		// SystemJS: If using webpack@<5, the following config is needed to avoid rewriting references to the global System variable
		CFG.module.rules.push({ parser: { system: false } });

		CFG.devServer = CFG.devServer || {};
		CFG.devServer.headers = CFG.devServer.headers || {};
		CFG.devServer.headers['Access-Control-Allow-Origin'] = '*';
	},
};
