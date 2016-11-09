(function() {

   var homeController = function($scope) {
      var vm = $scope;

      vm.participantes = [];

      vm.participantesEmbaralhados = [];

      vm.paresSorteados = [];

      vm.showOnlyTo ;

      vm.hide = false;

      vm.isShowFor = function(pessoa) {
         if(S(vm.showOnlyTo).isEmpty()) {
            return !vm.hide;
         }
         return vm.showOnlyTo.toLowerCase() == pessoa.toLowerCase();
      }

      var montarParesSorteados = function() {
         vm.paresSorteados = [];
         for (var i = 0; i < vm.participantes.length; i++) {
            vm.paresSorteados.push({
               pessoa1: vm.participantes[i],
               pessoa2: vm.participantesEmbaralhados[i]
            });
         }
      }

      vm.sortear = function() {
         vm.participantesEmbaralhados = vm.participantes.slice(0, vm.participantes.length);
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
