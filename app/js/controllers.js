'use strict';

/* Controllers */

angular.module('BudgetFriend.controllers', [])
.controller('MyCtrl1', ['$scope', 'firebaseData', function MyCtrl1($scope, firebaseData) {

        $scope.users = firebaseData;


    }
])
.controller('MyCtrl2', ['$scope', 'firebaseData', function MyCtrl2($scope, firebaseData) {

        $scope.users = firebaseData;
        $scope.inkomst = 0;
        $scope.utgifter = 0;
        $scope.extrautg = 0;
        $scope.spara = 0;
        $scope.total = 0;
        $scope.totalSaved = 0;

    }
])
.controller('AuthController', ['$scope', '$location', '$firebaseObject', 'Auth', 'Users', 'FirebaseUrl',
    function AuthController($scope, $location, $firebaseObject, Auth, Users, FirebaseUrl) {

        var isLoggedIn = function() { //TODO: Auth Check should be done in the router via resolve
            if ($scope.authData) { $location.path('/profile') }
        };

        Auth.$onAuth(function (authData) {
            $scope.authData = authData;

            Users.$loaded().then(function() { //Refactor to Users service
                var user = Users.$getRecord(authData.uid);
                if (!user) {
                    //Here we create a new record in the database

                    var newUserRef = new Firebase(FirebaseUrl + '/Users/' + authData.uid);
                    var newUser = $firebaseObject(newUserRef);
                    var provider = authData.provider; //"google" or "facebook"
                    newUser.userName = authData[provider].displayName;
                    newUser.profileImage = authData[provider].profileImageURL;
                    newUser.savingsGoal = 0;
                    newUser.transactions = {};

                    newUser.$save().then(function() {
                        console.log(newUser);
                    });
                }
            });

            isLoggedIn();
        });

        $scope.login = function (provider) { //Accepts a string for providers we support, ie "Google", "Facebook"
            Auth.$authWithOAuthPopup(provider).catch(function(error) {
                console.log(error); //Replace with some some kind of notification popup later?
            });
        };

        $scope.logout = function () {
            Auth.$unauth();
        };

        isLoggedIn();
    }
])
.controller('ProfileController', ['$scope', 'Users', 'Auth', function ProfileController($scope, Users, Auth) {
        var authData = Auth.$getAuth();
        console.log(authData);
        //Populate the $scope
        switch(authData.provider) {
            case 'google':
                $scope.name = authData.google.displayName;
                $scope.profileImage = authData.google.profileImageURL;
                return;
            case 'facebook':
                $scope.name = authData.facebook.displayName;
                $scope.profileImage = authData.facebook.profileImageURL;
                return;
            default:
                return;
        }

    }
])
