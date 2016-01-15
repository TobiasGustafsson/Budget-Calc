'use strict';

/* Controllers */

angular.module('BudgetFriend.controllers', [])
.controller('MyCtrl1', ['$scope', 'firebaseData', function MyCtrl1($scope, firebaseData) {

        $scope.users = firebaseData;


    }
])
.controller('MyCtrl2', ['$scope', 'firebaseData', function MyCtrl2($scope, firebaseData) {

        $scope.users = firebaseData;

    }
])
.controller('AuthController', ['$scope', '$location', 'Auth', function AuthController($scope, $location, Auth) {

        //TODO: If user doesn't exist in Users array, create a new entry

        var isLoggedIn = function() { //Should be refactored into a service?
            if ($scope.authData) { $location.path('/profile') }
        };

        Auth.$onAuth(function (authData) {
            $scope.authData = authData;
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
.controller('ProfileController', ['$scope', 'Profile', 'Auth', function ProfileController($scope, Profile, Auth) {
        var authData = Auth.$getAuth();
        console.log(authData);

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