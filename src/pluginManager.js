import Vue from 'vue';
const pluginRegistry = [];
const compRegistry = [];

import SystemJSexecute from 'systemjs/dist/system.js'; // нужно для появления window.System
const System = window.System;

// асинхронная версия, TODO
// const { System, applyImportMap, setBaseUrl } = require('systemjs/dist/system-node.cjs');
// setBaseUrl(System, `${window.location.protocol}//${window.location.host}`);
// applyImportMap(System, {imports: {pluginData: '/pluginService/pluginData/index.js',}, });

// SystemJS - потому что это на данный момент это единственный приемлемый способ получать модули с клиента
// он может даже вебпаковские чанки потреблять (https://github.com/joeldenning/systemjs-webpack-interop)
// по идее, можно будет заменить на https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports
// но пока что нативный функционал работает странно, и спека получения файлов по HTTP не допилена
// будет примерно так:
// webpackIgnore - чтобы вебпак не пытался делать это своим динамическим импортом
// import(/* webpackIgnore: true */ '/pluginService/pluginComps/MyPluginAsyncComponent/app.js')

const pluginManager = {
	init: function () {
		return System.import(['pluginData'])
			.then((pluginData) => {
				for (const plug of pluginData.pluginList) registerPlugin(plug);
				registerGlobalComps();
			})
			.catch((error) => console.error(error));
	},
	getRoutes,
	getRouteName,
	getCompGlobalNamesBySlot,
};

function getCompGlobalNamesBySlot(slotName) {
	return compRegistry
		.filter((comp) => comp.slotName === slotName)
		.map((comp) => getCompGlobalName(comp._pluginName, comp.name));
}

function getRouteName(plug, route) {
	return `plugRt__${plug.name}__${route.name}`;
}

function getPlugin(pluginName) {
	return pluginRegistry.find((plug) => plug.name === pluginName);
}

function registerPlugin(pluginData) {
	pluginRegistry.push(pluginData);
}

function getRoutes() {
	const routes = [];

	pluginRegistry.forEach((plug) => {
		plug.routes.forEach((route) => {
			makePreload(route);
			routes.push({
				name: getRouteName(plug, route),
				path: `/${getRouteName(plug, route)}`,
				meta: {
					title: route.title,
				},
				component: () => ({
					component: new Promise(componentResolver(route, plug.name)),
				}),
			});
		});
		// для записей с sourceUrl здесь можно сделать прелоад (<link type="preload" as="script"></link>)
	});

	return routes;
}

function registerGlobalComps() {
	pluginRegistry.forEach((plug) => {
		plug.globalComps.forEach((comp) => {
			makePreload(comp);
			compRegistry.push({
				_pluginName: plug.name,
				...comp,
			});
			Vue.component(getCompGlobalName(plug.name, comp.name), componentResolver(comp, plug.name));
		});
	});
}

function getCompGlobalName(plugName, compName) {
	return `plugCmp__${plugName}__${compName}`;
}

function componentResolver(routeOrComponent, plugName) {
	// routeOrComponent - объект с полями sourceCode либо sourceUrl (TODO сделать отдельный более строгий в плане типа объект)
	return (resolve, reject) => {
		if (routeOrComponent.sourceCode) {
			// код компонента получается сразу в ответе
			resolve(Vue.component(`plug__${plugName}__${routeOrComponent.sourceCode.name}`, routeOrComponent.sourceCode));
		} else if (routeOrComponent.sourceUrl) {
			// код компонента получается асинхронно, при вызове этого компонента (т.е. загрузки маршрута)
			log(`PM: resolving ${routeOrComponent.sourceUrl}`);
			window.System.import(routeOrComponent.sourceUrl)
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

function log() {
	console.log.apply(console, arguments);
}

export default pluginManager;
