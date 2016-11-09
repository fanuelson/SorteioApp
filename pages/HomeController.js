(function() {

   var homeController = function($scope) {
      var vm = $scope;

      vm.participante = {};

      vm.participantes = [];

      vm.participantesParaSortear = [];

      vm.participantesEmbaralhados = [];

      vm.paresSorteados = [];

      vm.showOnlyTo ;

      vm.hide = false;

      vm.adicionarParticipante = function() {
          vm.participantes.push(vm.participante);
          vm.participante = {};
      }

      vm.querySearch = function(criteria) {
          var results = [];
          vm.participantes.forEach(function(p, i){
             if(p.nome.toLowerCase().includes(criteria.toLowerCase())) {
                 results.push(p);
             }
          });
          console.log(criteria);
          return results;
      }

      vm.isShowFor = function(pessoa) {
         if(S(vm.showOnlyTo).isEmpty()) {
            return !vm.hide;
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

   }

   var depends = [
      '$scope',
      homeController
   ]

   angular.module('myApp').controller('homeController', depends);

})();
