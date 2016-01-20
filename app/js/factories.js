'use strict';

/* Factories */

angular.module('BudgetFriend.factories', ['firebase'])
.factory('firebaseData', ['$firebaseArray', 'FirebaseUrl', function($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + '/Users');
    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
}])

.factory('Auth', ['$firebaseAuth', 'FirebaseUrl', function($firebaseAuth, FirebaseUrl) {
    //Create and return the AngularFire auth object for our app
    var ref = new Firebase(FirebaseUrl);
    return $firebaseAuth(ref);
}])

.factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl) {
    /*
    * Use this factory for any methods where you need to add, remove, edit User data
    */
    var usersRef = new Firebase(FirebaseUrl + '/Users');
    var users = $firebaseArray(usersRef);


    function registerNewUser(authData) {
        users.$loaded().then(function () {
            var user = users.$getRecord(authData.uid);
            if (!user) {
                //Here we create a new record in the database
                //There is a method on Auth.$createUser -> could be appropriate to replace this code.
                //Works fine for now though
                var newUserRef = new Firebase(FirebaseUrl + '/Users/' + authData.uid);
                var newUser = $firebaseObject(newUserRef);
                var provider = authData.provider; //"google" or "facebook"
                newUser.userName = authData[provider].displayName;
                newUser.profileImage = authData[provider].profileImageURL;

                newUser.$save().then(function () {
                    console.log(newUser);
                });
            }
        });
    }

    return {
        registerNewUser: registerNewUser
    };
})
