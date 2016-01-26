'use strict';

/* Controllers */

angular.module('BudgetFriend.controllers', [])
.controller('MyCtrl1', ['$scope', 'firebaseData', function MyCtrl1($scope, firebaseData) {

        $scope.users = firebaseData;


    }
])
.controller('MyCtrl2', ['$scope', 'firebaseData', function MyCtrl2($scope, firebaseData) {

    

 
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
      

    var updateBudget = function() {
        userBudget.$loaded().then(function() {
            //console.log("id_  ", userBudget["0"].$id);
            var expenseRef = new Firebase(FirebaseUrl + '/Users/' + authData.uid + '/budget/' + userBudget["0"].$id + '/expenses/');
            var expenseData = $firebaseArray(expenseRef);

            $scope.addExpense = function() {
                expenseData.$add({
                    expense: $scope.expense,
                    expenseName: $scope.expenseName
                });
                updateBudget();
            };
            
            //console.log("controllers  val -->", val);
            var sumExpenses = 0;
            var expTotal = [];
            expenseData.$loaded().then(function() {
                angular.forEach(expenseData, function(k) {
                    console.log("loopppp -->", k)
                    sumExpenses += k.expense;
                    
                    expTotal.push({name: k.expenseName, cost: k.expense});
                    console.log('ALL DATA MAYABEE -->', expTotal);
                    
                });
                $scope.nameOf = expTotal.name;
                $scope.costOf = expTotal.cost;
                $scope.allExpenses = expTotal;
                $scope.addedBudget = userBudget["0"].income - sumExpenses;
            })

            console.log("sumexpensem -->", sumExpenses)
            
        })
    };
updateBudget();
    

        
        $scope.addBudget = function() {
        userBudget.$add({
            income: $scope.income
        });
            updateBudget();
        };
        //Populate the $scope
        $scope.name = authData[provider].displayName;
        $scope.profileImage = authData[provider].profileImageURL;
    }
])
