'use strict';


// Declare app level module which depends on filters, and services
angular.module('BudgetFriend', [
  'ngRoute',
  'ngAnimate',
  'BudgetFriend.services',
  'BudgetFriend.directives',
  'BudgetFriend.controllers',
  'BudgetFriend.factories'
])
.constant('FirebaseUrl', 'https://budgetfriend.firebaseio.com')
.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    /*
    * If the $requireAuth promise is rejected in resolve ->
    * catch the error from $routeChangeError ->
    * Redirect to login page
    */
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when(
      '/login', {templateUrl: 'partials/loginpage.html', controller: 'MyCtrl1',
      resolve: {
          'currentAuth': ['Auth', function(Auth) {
              return Auth.$waitForAuth(); //Waits to complete
          }]
      }
  });
  $routeProvider.when(
      '/profile', {templateUrl: 'partials/profilepage.html', controller: 'MyCtrl2',
      resolve: {
          'currentAuth': ['Auth', function(Auth) {
              return Auth.$requireAuth(); //Throws $routeChangeError if Auth is null
          }]
      }
  });
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
