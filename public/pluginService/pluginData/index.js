// Это не файл, этот код который строит сервис по данным из БД и с диска (для синхронных компонентов)

const pluginList = [
	{
		id: 777,
		name: 'Plugin1_',
		routes: [
			{
				path: 'Plugin1_RoutePathA',
				name: 'Plugin1_RouteNameA',
				// type: 'VUE_COMPONENT',
				preload: true,
				sourceCode: {
					// данные поля sourceCode сервис читает с диска, он там в скомпилённом виде (dist)
					name: 'Plugin1_RouteComponent',
					render: function (createElement) {
						return createElement('h1', ['это контент компонента МАРШРУТА плагина', createElement('PLUGCMP')]);
					},
				},
			},
			{
				path: 'Plugin1_RoutePathB',
				name: 'Plugin2_RouteNameB',
				// type: 'VUE_COMPONENT',
				// sourceCode не указан, вместо у него урл
				sourceUrl: '/pluginService/pluginComps/MyPluginAsyncComponent/app.js',
			},
			/* 			{
				path: 'Plugin1_RoutePath2',
				name: 'Plugin1_RouteName',
				// данные поля sourceCode сервис читает с диска, он там в скомпилённом виде (dist)
				// кейс когда компонент не указан, см. PluginManager
				type: 'API_IFRAME',
				sourceCode: {
					// нечто аналогичное вызовам АПИ, описанным в https://glitch.com/edit/#!/trello-power-up-skeleton?path=public%2Fjs%2Fclient.js%3A23%3A6
					'card-buttons': function (t, options) {
						return t.set('member', 'shared', 'hello', 'world').then(function () {
							return [
								{
									icon: BLACK_ROCKET_ICON,
									text: 'Estimate Size',
									callback: function (t) {
										return t.popup({
											title: 'Estimation',
											url: 'estimate.html',
										});
									},
								},
							];
						});
					},
				},
			}, */
		],
		// компоненты можно и локально подтягивать, просто это сложнее, так что лучше кмк асинхронные глобальные
		// большого оверхеда не будет, главное неймспейсы при регистрации соблюдать
		globalComps: [
			{
				// данные поля sourceCode сервис читает с диска, он там в скомпилённом виде (dist)
				// кейс когда компонент не указан, см. PluginManager
				sourceCode: {
					name: 'Plugin1_GlobalComponent',
					render: function (createElement) {
						return createElement(
							'div',
							{
								style: `color: red; font-size: 12px; padding: .5rem; font-weight: normal;`,
							},
							'это контент ГЛОБАЛЬНОГО компонента (например, контрола) плагина'
						);
					},
				},
			},
		],
		tabsAndLinks: [
			{
				title: 'Имя ссылки в админке',
				route: '/здесь путь перехода. TODO подумать над параметрами, возможно замутить ручную функцию типа onclick',
			},
		],
	},
];

for (const plug of pluginList) window.WflowPluginManager.registerPlugin(plug);
