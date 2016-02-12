angular.module('signupApp')
  .controller('HandleCtrl', function($scope, $http) {
    $scope.valid;
    $scope.handle = '';
    $scope.$watch('handle', function(value) {
      if (value.length < 6) {
        $scope.valid = false;
      } else {
        $http({
          method: 'GET',
          url: 'http://localhost:5001/api/handle/' + value
        }).success(function(data, status) {
          if (status == 200 &&
          data.handle == $scope.handle &&
          data.id === null) {
            $scope.valid = true;
          } else {
            $scope.valid = false;
          }
        })
      }
    })
  });