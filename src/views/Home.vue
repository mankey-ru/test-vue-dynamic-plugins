<template>
	<div class="home">
		<h2>HOME</h2>
		<div style="border: 1px solid green; padding: 10px">
			<h3>это слот HOME_BOTTOM, ниже выводятся подходящие компоненты</h3>
			<component v-for="globName in homeButtonCompGlobalNames" :key="globName" :is="globName" />
		</div>
	</div>
</template>

<script>
import pluginManager from '@/pluginManager.js';

export default {
	name: 'Home',
	data() {
		return {
			homeButtonCompGlobalNames: pluginManager.getCompGlobalNamesBySlot('HOME_BOTTOM'),
		};
	},
	components: {},
	mounted() {
		// console.log(this.$options.components);
	},
};
</script>
