'use strict';

/* Factories */

angular.module('app', ['ngAnimate']);

angular.module('BudgetFriend.factories', ['firebase'])
.factory('firebaseData', ['$firebaseArray', function($firebaseArray) {
    var ref = new Firebase("https://budgetfriend.firebaseio.com/");

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);

    }
])
