'use strict';


// Declare app level module which depends on filters, and services
angular.module('BudgetFriend', [
  'ngRoute',
  'ngAnimate',
  'BudgetFriend.services',
  'BudgetFriend.directives',
  'BudgetFriend.controllers',
  'BudgetFriend.factories'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/loginpage.html', controller: 'MyCtrl1'});
  $routeProvider.when('/profile', {templateUrl: 'partials/profilepage.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
