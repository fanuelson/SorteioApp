(function() {

	"use strict";

	/* -- CONSTANTS CONFIG -- */
	angular.module('myApp').constant(
		"APP_CONFIG", {
			"REST_BASE_URL" : "http://localhost:8080/sorteio-web-api/api",
		}
	);
	/* -- CONSTANTS CONFIG -- */

	/* -- MATERIAL CONFIG -- */
	var configTheme = function($mdThemingProvider){
		// Update the theme colors to use themes on font-icons
		$mdThemingProvider.theme('default')
		.primaryPalette("blue")
		.warnPalette('red');
	};

	var configDateFormat = function($mdDateLocaleProvider) {
		$mdDateLocaleProvider.formatDate = function(date) {
			var m = moment(date);
			return m.isValid() ? m.format('DD/MM/YYYY') : null;
		};
	};

	angular.module('myApp').config(configTheme);
	angular.module('myApp').config(configDateFormat);
	/* -- END MATERIAL CONFIG -- */

	/* -- ROUTE CONFIG -- */
	var routeConfig = function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state("root", {
			url: "/",
			views: {
				"starterContent":{
					templateUrl: "pages/home.html"
				}
			}
		})
		.state("home", {
			url: "/home",
			views: {
				"starterContent":{
					templateUrl: "pages/home.html"
				}
			}
		});

	}

	var configRoute = [
		'$stateProvider',
		'$urlRouterProvider',
		routeConfig
	]

	angular.module('myApp').config(configRoute);

	/* -- END ROUTE CONFIG -- */

})();
