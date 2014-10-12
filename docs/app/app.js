'use strict';

// Declare app level module which depends on views, and components
angular.module('docs', [
  'btford.markdown',
  'ngRoute'
])
.config(['$routeProvider', '$sceProvider', function($routeProvider, $sceProvider) {
  $routeProvider.otherwise({redirectTo: '/styleguide'});

  $routeProvider.when('/styleguide', {
    templateUrl: 'partials/styleguide.html',
  });

  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);

}])
.run(['$rootScope', '$http', function ($scope, $http) {
  $http.get('styleguide.json').then(function (httpResponse) {
    $scope.styleguide = httpResponse.data;
  });
}]);
