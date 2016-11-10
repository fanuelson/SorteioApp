function notificacaoEmailService($http, APP_CONFIG) {

	var resource = "/notificacao"
	var rest_url = APP_CONFIG.REST_BASE_URL;

	this.sendNotification = function(paresSorteados) {
		return $http.post(rest_url + resource + "/email", paresSorteados);
	}

};

var depends = [
	'$http',
	'APP_CONFIG',
	notificacaoEmailService
];

angular.module('myApp').service('notificacaoEmailService', depends);
