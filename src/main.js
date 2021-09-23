import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// pluginData можно запросить аяксом в main.js, по идее, тогда и отдельный чанк для pluginManager не понадобится
window.WflowPluginManager.registerGlobalComps(Vue);

new Vue({
	router,
	render: (h) => h(App),
	mounted() {},
}).$mount('#app');
