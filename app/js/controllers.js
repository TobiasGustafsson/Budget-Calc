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

