const pluginRegistry = [];
window.WflowPluginManager = {
	registerPlugin: function (pluginData) {
		pluginRegistry.push(pluginData);
	},
	getRoutes: function (Vue) {
		const routes = [];

		pluginRegistry.forEach((plugData) => {
			plugData.routes.forEach((plugRoute) => {
				routes.push({
					name: `plug__${plugData.name}__${plugRoute.name}`,
					path: `/plug__${plugData.name}__${plugRoute.path}`,
					component: () => ({
						component: new Promise((resolve, reject) => {
							const compiledComponent = plugRoute.compiledComponent;
							// если plugRoute.component нет - идём за чанком аяксом
							resolve(
								Vue.component(
									`plug__${plugData.name}__${compiledComponent.name}`,
									compiledComponent
								)
							);
						}),
					}),
				});
			});
		});

		return routes;
	},
	registerGlobalComps: function (Vue) {
		pluginRegistry.forEach((plugData) => {
			plugData.globalComps.forEach((plugComp) => {
				Vue.component(
					/* `plugCmp__${plugData.id}__${plugComp.name}` */ 'PLUGCMP',
					function (resolve, reject) {
						const compiledComponent = plugComp.compiledComponent;
						// если compiledComponent нет - идём за чанком аяксом
						resolve(compiledComponent);
					}
				);
			});
		});
	},
};
