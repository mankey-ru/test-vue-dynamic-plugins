import Vue from 'vue';
const SystemJS = window.System;
const pluginRegistry = [];

export default {
	registerPlugin: function (pluginData) {
		pluginRegistry.push(pluginData);
	},
	getRoutes: function () {
		const routes = [];

		pluginRegistry.forEach((plugData) => {
			plugData.routes.forEach((plugRoute) => {
				makePreload(plugRoute);
				routes.push({
					name: `plug__${plugData.name}__${plugRoute.name}`,
					path: `/plug__${plugData.name}__${plugRoute.path}`,
					component: () => ({
						component: new Promise(componentResolver(plugRoute, plugData.name, Vue)),
					}),
				});
			});
			// для записей с sourceUrl здесь можно сделать прелоад (<link type="preload" as="script"></link>)
		});

		return routes;
	},
	registerGlobalComps: function () {
		pluginRegistry.forEach((plugData) => {
			plugData.globalComps.forEach((plugComp) => {
				makePreload(plugComp);
				Vue.component(
					/* `plugCmp__${plugData.name}__${plugComp.name}` */ 'PLUGCMP',
					componentResolver(plugComp, plugData.name, Vue)
				);
			});
		});
	},
	getPlugin: function (pluginName) {
		return pluginRegistry.find((plug) => plug.name === pluginName);
	},
};

function componentResolver(routeOrComponent, plugName, Vue) {
	// routeOrComponent - объект с полями sourceCode либо sourceUrl (TODO сделать отдельный более строгий в плане типа объект)
	return (resolve, reject) => {
		if (routeOrComponent.sourceCode) {
			// код компонента получается сразу в ответе
			resolve(Vue.component(`plug__${plugName}__${routeOrComponent.sourceCode.name}`, routeOrComponent.sourceCode));
		} else if (routeOrComponent.sourceUrl) {
			// код компонента получается асинхронно, при вызове этого компонента (т.е. загрузки маршрута)
			SystemJS.import(routeOrComponent.sourceUrl)
				.then((mod) => resolve(mod.default))
				.catch(reject);
		} else throw `Neither sourceCode nor sourceUrl present`;
	};
}

function makePreload(routeOrComponent) {
	// TODO проверить, сработает ли вообще такой прелоад с SystemJS
	if (!routeOrComponent.preload || !routeOrComponent.sourceUrl) return;
	const preloadLink = document.createElement('link');
	preloadLink.href = routeOrComponent.sourceUrl;
	preloadLink.rel = 'preload';
	preloadLink.as = 'script';
	document.head.appendChild(preloadLink);
}
