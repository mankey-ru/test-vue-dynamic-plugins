import Vue from 'vue';
import App from './App.vue';
import router from './router';

// TODO заменить SystemJS на нативный динамический импорт, когда его допилят
// webpackIgnore - чтобы вебпак не пытался делать это своим динамическим импортом
// import(/* webpackIgnore: true */ '/pluginService/pluginComps/MyPluginAsyncComponent/app.js')

/* import SystemJS from 'systemjs/dist/system.min.js';

SystemJS.import('/pluginService/pluginComps/MyPluginAsyncComponent/app.js')
	.then((mymodule) => {
		console.log('mymodule', mymodule);
	})
	.catch((error) => console.error(error)); */

window.WflowPluginManager.registerGlobalComps(Vue);

new Vue({
	router,
	render: (h) => h(App),
	mounted() {},
}).$mount('#app');
