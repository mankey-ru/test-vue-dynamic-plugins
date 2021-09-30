import Vue from 'vue';
import App from './App.vue';

import pluginManager from '@/pluginManager.js';

pluginManager
	.init()
	.then(() => {
		new Vue({
			router: require('./router').default,
			render: (h) => h(App),
			mounted() {},
		}).$mount('#app');
	})
	.catch((error) => console.error(error));
