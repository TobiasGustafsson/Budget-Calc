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
.controller('AuthController', ['$scope', '$location', '$firebaseObject', 'Auth', 'Users',
    function AuthController($scope, $location, $firebaseObject, Auth, Users) {

        Auth.$onAuth(function (authData) {
            if (authData) {
                $scope.authData = authData;
                Users.registerNewUser(authData);
                $location.path('/profile')
            }
        });

        $scope.login = function (provider) { //Accepts a string for providers we support, ie "Google", "Facebook"
            Auth.$authWithOAuthPopup(provider).catch(function(error) {
                console.log(error); //Replace with some some kind of notification popup later?
            });
        };

        $scope.logout = function () {
            Auth.$unauth();
            $location.path('/login')
        };
    }
])
.controller('ProfileController', ['$scope', 'Users', 'Auth', function ProfileController($scope, Users, Auth) {
        var authData = Auth.$getAuth();
        var provider = authData.provider; //"google" or "facebook"
        console.log(authData);
        //Populate the $scope
        $scope.name = authData[provider].displayName;
        $scope.profileImage = authData[provider].profileImageURL;
    }
])
