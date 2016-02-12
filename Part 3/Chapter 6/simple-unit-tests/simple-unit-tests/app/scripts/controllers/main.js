'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('HandleCtrl', function($scope, $http) {
    $scope.valid;
    $scope.handle = '';
    $scope.$watch('handle', function(value) {
      if (value.length < 6) {
        $scope.valid = false;
      } else {
        $http({
          method: 'GET',
          url: '/api/handle/' + value
        }).success(function(data, status) {
          if (status == 200 &&
          data.handle == $scope.handle &&
          data.id === null) {
            $scope.valid = true;
          } else {
            $scope.valid = false;
          }
        });
      }
    });
  })
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
