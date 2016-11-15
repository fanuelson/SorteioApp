(function() {

   var homeController = function($scope, $mdToast, notificacaoEmailService) {
      var vm = $scope;

      vm.participante = {};

      vm.participantes = [];

      vm.participantesParaSortear = [];

      vm.participantesEmbaralhados = [];

      vm.paresSorteados = [];

      vm.showOnlyTo ;

      vm.hideSorteio = false;

      vm.csvJson = {};

      vm.isParticipantesEquals = function(p1, p2) {
          return p1.nome == p2.nome || p1.email == p2.email;
      }

      vm.participanteExistente = function(part) {
          for(var i = 0; i < vm.participantes.length; i++ ) {
              var p = vm.participantes[i];
              if(vm.isParticipantesEquals(p, part)) {
                     return true;
              }
          }

          return false;
      }

      vm.adicionarParticipante = function() {
        if(S(vm.participante.nome).isEmpty())  return;
        if(S(vm.participante.email).isEmpty())  return;
        if(vm.participanteExistente(vm.participante)) {
            showErrorToast("Participante ja adicionado.");
            return;
        }

         vm.participante.nome  = vm.participante.nome.trim();
         vm.participante.email = vm.participante.email.trim();
         vm.participantes.push(vm.participante);
         vm.participante = {};
      }

      vm.removerParticipante = function(index) {
          vm.participantes.splice(index, 1);
      }

      vm.adicionarTodosParticipantesParaSorteio = function() {
          vm.participantesParaSortear = vm.participantes.slice(0, vm.participantes.length);
      }

      vm.querySearch = function(criteria) {
          var results = [];
          vm.participantes.forEach(function(p, i){
             if(p.nome.toLowerCase().includes(criteria.toLowerCase())) {
                 results.push(p);
             }
          });
          return results;
      }

      vm.isShowFor = function(pessoa) {
         if(S(vm.showOnlyTo).isEmpty()) {
            return !vm.hideSorteio;
         }
         return vm.showOnlyTo.nome.toLowerCase() == pessoa.nome.toLowerCase();
      }

      var montarParesSorteados = function() {
         vm.paresSorteados = [];
         for (var i = 0; i < vm.participantesParaSortear.length; i++) {
            vm.paresSorteados.push({
               pessoa1: vm.participantesParaSortear[i],
               pessoa2: vm.participantesEmbaralhados[i]
            });
         }
      }

      vm.sortear = function() {
         vm.participantesEmbaralhados = vm.participantesParaSortear.slice(0, vm.participantesParaSortear.length);
         embaralhar(vm.participantesEmbaralhados);
         montarParesSorteados();

         console.log(angular.toJson(vm.paresSorteados));;
      }

      var getRandomEntre = function(n1, n2) {
         if(n2 >= n1) {
            return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
         } else {
            return Math.floor((Math.random() * (n1 - n2 + 1)) + n2);
         }
      }

      var embaralhar = function(arr) {
         for (var i = 0; i < arr.length - 1 ; i++) {
            var rand = getRandomEntre(i+1, arr.length - 1);
            changeLugar(i,rand, arr);
         }
      }

      var changeLugar = function(l1, l2, arr) {
         var aux = arr[l1];
         arr[l1] = arr[l2];
         arr[l2] = aux;
      }

      vm.notificationLoading = false;

      var startNotificationLoading = function() {
         vm.notificationLoading = true;
      }

      var stopNotificationLoading = function() {
         vm.notificationLoading = false;
      }
      vm.sendNotification = function() {
         startNotificationLoading();
         vm.mensagensErro = [];
         $promise = notificacaoEmailService.sendNotification(vm.paresSorteados);
         $promise.success(function(res){
            vm.sucessoNotification = res;
            stopNotificationLoading();
            showSuccessToast(res.mensagem);
         }).error(function(res){
            stopNotificationLoading();
            montarMensagens(res);
         });
      }
      
      function montarMensagens(res) {
         vm.mensagensErro = vm.mensagensErro.concat(res.validacoesRegraNegocio);

      }

      var showSuccessToast = function(mensagem) {
         $mdToast.show({
            hideDelay   : 5000,
            position    : 'bottom right',
            controller  : 'successToastController',
            templateUrl : '/toasts/successToast.html',
            msgSuccess: mensagem
         });
      }

      var showErrorToast = function(mensagem) {
         $mdToast.show({
            hideDelay   : 5000,
            position    : 'bottom right',
            controller  : 'errorToastController',
            templateUrl : '/toasts/errorToast.html',
            msgErro: mensagem
         });
      }

      vm.csvFileImportCallback = function() {
            for (var i = 0; i < vm.csvJson.length ; i++) {
               var nome = vm.csvJson[i]['0'];
               var email = vm.csvJson[i]['1'];
               if(!S(nome).isEmpty() && !S(email).isEmpty() && nome.toLowerCase() !== 'nome') {
                  var pp = {
                     'nome' : nome,
                     'email': email
                  }
                  if(!vm.participanteExistente(pp)) {
                     vm.participantes.push(pp);
                  }
               }
            }
            vm.$apply();

      }

   }

   var depends = [
      '$scope',
      '$mdToast',
      'notificacaoEmailService',
      homeController
   ]

   angular.module('myApp').controller('homeController', depends);

})();
