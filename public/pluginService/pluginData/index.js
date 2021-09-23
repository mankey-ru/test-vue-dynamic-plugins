// Это не файл, этот код который строит сервис по данным из БД и с диска (для синхронных компонентов)

const pluginList = [
	{
		id: 777,
		name: 'FirstPluginName',
		routes: [
			{
				path: 'FirstPluginRoutePath',
				name: 'FirstPluginRouteName',
				// данные поля compiledComponent сервис читает с диска, он там в скомпилённом виде (dist)
				// кейс когда компонент не указан, см. PluginManager
				compiledComponent: {
					name: 'FirstPluginRouteComponent',
					render: function (createElement) {
						return createElement('h1', [
							'это контент компонента МАРШРУТА плагина',
							createElement('PLUGCMP'),
						]);
					},
				},
			},
		],
		// компоненты можно и локально подтягивать, просто это сложнее, так что лучше кмк асинхронные глобальные
		// большого оверхеда не будет, главное неймспейсы при регистрации соблюдать
		globalComps: [
			{
				// данные поля compiledComponent сервис читает с диска, он там в скомпилённом виде (dist)
				// кейс когда компонент не указан, см. PluginManager
				compiledComponent: {
					name: 'FirstPluginGlobalComponent',
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
				route:
					'/здесь путь перехода. TODO подумать над параметрами, возможно замутить ручную функцию типа onclick',
			},
		],
	},
];

for (const plug of pluginList) window.WflowPluginManager.registerPlugin(plug);
