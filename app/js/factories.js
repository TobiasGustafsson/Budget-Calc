'use strict';

/* Factories */

angular.module('BudgetFriend.factories', ['firebase'])
.factory('firebaseData', ['$firebaseArray', function($firebaseArray) {
    var ref = new Firebase("https://budgetfriend.firebaseio.com/Users");
    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
}])

.factory('Auth', ['$firebaseAuth', 'FirebaseUrl', function($firebaseAuth, FirebaseUrl) {
    //Create and return the AngularFire auth object for our app
    var ref = new Firebase(FirebaseUrl);
    return $firebaseAuth(ref);
}])

.factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl) {
    var usersRef = new Firebase(FirebaseUrl + '/Users');
    return $firebaseArray(usersRef); //
})