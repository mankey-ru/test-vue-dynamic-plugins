import Vue from 'vue';
import App from './App.vue';

import pluginManager from '@/../pluginManager/pluginManager.src.js';

import SystemJSexecute from 'systemjs/dist/system.js'; // нужно для появления window.System
const System = window.System;

// const { System, applyImportMap, setBaseUrl } = require('systemjs/dist/system-node.cjs');
// setBaseUrl(System, `${window.location.protocol}//${window.location.host}`);
/* applyImportMap(System, {
	imports: {
		pluginData: '/pluginService/pluginData/index.js',
	},
}); */

// SystemJS - потому что это на данный момент это единственный приемлемый способ получать модули с клиента
// он может даже вебпаковские чанки потреблять (https://github.com/joeldenning/systemjs-webpack-interop)
// по идее, можно будет заменить на https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports
// но пока что нативный функционал работает странно, и спека получения файлов по HTTP не допилена
// будет примерно так:
// webpackIgnore - чтобы вебпак не пытался делать это своим динамическим импортом
// import(/* webpackIgnore: true */ '/pluginService/pluginComps/MyPluginAsyncComponent/app.js')

System.import(['pluginData'])
	.then((pluginData) => {
		for (const plug of pluginData.pluginList) pluginManager.registerPlugin(plug);
		pluginManager.registerGlobalComps();
		new Vue({
			router: require('./router').default,
			render: (h) => h(App),
			mounted() {},
		}).$mount('#app');
	})
	.catch((error) => console.error(error));
