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
    $scope.test = 0;
    
    var counter = 0;
    $scope.bugdetNote = [];
    
    $scope.addFormField = function ($event) {
        counter++;
        $scope.bugdetNote.push({
            note2: ''
        });
        $event.preventDefault();
    };
 
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
.controller('ProfileController', ['$scope', 'Users', 'Auth', '$firebaseArray', 'FirebaseUrl', function ProfileController($scope, Users, Auth, $firebaseArray, FirebaseUrl) {
        var authData = Auth.$getAuth();
        var provider = authData.provider; //"google" or "facebook"
        var budgetRef = new Firebase(FirebaseUrl + '/Users/' + authData.uid + '/budget/');
        var userRef = new Firebase(FirebaseUrl + '/Users/' + authData.uid);
        var userBudget = $firebaseArray(budgetRef);
        var userData = $firebaseArray(userRef);

        //Omöjligt att få ut denna data eller displaya den på något vis....Z.Z
        console.log(userBudget);
        console.log(userData);

        $scope.addBudget = function() {
        var userBud = userBudget;
        userBud.$add({
            income: $scope.income,
            ExpenseName: $scope.expenseName,
            expense: $scope.expense
            });
        }
        //Populate the $scope
        $scope.budgetTotal = $scope.income - $scope.expense;
        $scope.name = authData[provider].displayName;
        $scope.profileImage = authData[provider].profileImageURL;
    }
])
