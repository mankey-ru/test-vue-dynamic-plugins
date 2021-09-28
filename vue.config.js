// const fs = require('fs');

module.exports = {
	filenameHashing: false,
	// chainWebpack: (config) => config.optimization.minimize(false),
	configureWebpack: function (CFG) {
		// CFG.output.libraryExport = 'default';
		// CFG.output.filename = 'js/[name].js'; // то же что filenameHashing
		// CFG.output.chunkFilename = 'js/[name].js';
		// CFG.optimization.concatenateModules = false;
		// fs.writeFileSync('---EFFECTIVE_CONFIG---.js', JSON.stringify(CFG, null, '\t'));
	},
};

/* If using webpack@<5, the following config is needed to avoid rewriting references to the global System variable:

{
  module: {
    rules: [
      { parser: { system: false } }
    ]
  }
} */
