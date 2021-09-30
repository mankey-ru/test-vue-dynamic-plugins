import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import pluginManager from '@/pluginManager.js';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	...pluginManager.getRoutes(Vue),
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
