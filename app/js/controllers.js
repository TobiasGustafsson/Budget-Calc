'use strict';

/* Controllers */

angular.module('BudgetFriend.controllers', [])
.controller('MyCtrl1', function MyCtrl1($scope) {
    $scope.event = {

        name: 'Fishes',
        ost: '2',
        fishes: [

            {
                name: "Fish1"
            },

            {
                name: "Fish2"
            },

            {
                name: "Fish3"
            },

            {
                name: "Fish4"
            }
        ]
    }
})
.controller('MyCtrl2', [function() {

  }]);
