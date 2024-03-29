// Это не файл, этот код который строит сервис по данным из БД и с диска (для синхронных компонентов)

const pluginData = {
	pluginList: [
		{
			id: 777,
			name: 'Plugin1',
			routes: [
				{
					name: 'RouteNameA',
					title: 'Синхронный маршрут плагина',
					// type: 'VUE_COMPONENT',
					preload: true,
					sourceCode: {
						// данные поля sourceCode сервис читает с диска, он там в скомпилённом виде (dist)
						name: 'Plugin1_RouteComponent',
						render: function (createElement) {
							return createElement('h1', ['это контент синхронного МАРШРУТА плагина']);
						},
					},
				},
				{
					name: 'RouteNameB',
					title: 'Асинхронный маршрут плагина',
					// type: 'VUE_COMPONENT',
					// sourceCode не указан, вместо у него урл
					sourceUrl: '/pluginService/pluginComps/comp-async/app.js',
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
								'button',
								{
									style: `background: yellow;`,
								},
								'это контент синхронного компонента (например, контрола) плагина'
							);
						},
					},
					slotName: 'HOME_BOTTOM',
				},
			],
			tabsAndLinks: [
				{
					title: 'Имя ссылки в админке',
					route: '/здесь путь перехода. TODO подумать над параметрами, возможно замутить ручную функцию типа onclick',
				},
			],
		},
	],
};

System.register([], function (_export, _context) {
	return {
		execute: function () {
			_export(pluginData);
		},
	};
});
