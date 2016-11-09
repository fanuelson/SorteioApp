(function() {

   var appController = function($scope, $mdSidenav, $state) {
      var c = $scope;

      c.toggleMenu = toggleMenu('sideBarMenu');

      function toggleMenu(componentId) {
         return function() {
            $mdSidenav(componentId).toggle();
         }
      }

   }

   var depends = [
      '$scope',
      '$mdSidenav',
      '$state',
      appController
   ]

   angular.module('myApp').controller('appCtrl', depends);

})();
