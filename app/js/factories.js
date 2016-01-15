'use strict';

/* Factories */

angular.module('BudgetFriend.factories', ['firebase'])
    .factory('firebaseData', ['$firebaseArray', function($firebaseArray) {
        var ref = new Firebase("https://budgetfriend.firebaseio.com/Users");
        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
    }])
    .factory('Auth', ['$firebaseAuth', 'FirebaseUrl', function($firebaseAuth, FirebaseUrl) {
        var ref = new Firebase(FirebaseUrl);
        return $firebaseAuth(ref);
    }])
    .factory('Profile', function($firebaseArray, $firebaseObject, FirebaseUrl) {
        var usersRef = new Firebase(FirebaseUrl);
        var users = $firebaseArray(usersRef); //

        var Profile = {
            getProfile: function(uid) {
                return $firebaseObject( users.child(uid) );
            }
        };

        return Profile;
    })