parking.controller("parkingCtrl", function ($scope, parkingService3, parkingHttpFacade, cars, searchService) {
   
  $scope.colors = ["White", "Black", "Blue", "Red", "Silver"];

  $scope.cars = cars.data;
   
  $scope.parkCar = function (car) {
    parkingHttpFacade.saveCar(car)
      .success(function (data, status, headers, config) {
        retrieveCars();
        $scope.message = "The car was parked successfully!";
      })
      .error(function (data, status, headers, config) {
        switch(status) {
          case 401: {
            $scope.message = "You must be authenticated!"
            break;
          }
          case 500: {
            $scope.message = "Something went wrong!";
            break;
          }
        }
        console.log(data, status);
      });
  	};
	  
	$scope.searchCarsByCriteria = function (criteria) {
	  delete $scope.searchResult;
	  delete $scope.message;
      searchService.filter($scope.cars, criteria)
        .then(function (result) {
          $scope.searchResult = result;
        })
        .catch(function (message) {
          $scope.message = message;
        });
      };

  $scope.calculateTicket = function (car) {
    $scope.ticket = parkingService3.calculateTicket(car);
  };

  $scope.stopTicking = function () {
    $scope.$emit("STOP_TICK");
  };

  var listenToTick = function () {
    $scope.$on('TICK', function (event, tick) {
      $scope.tick = tick;
    });
  };

  listenToTick();
});

parking.controller("carCtrl", function ($scope, $routeParams, $location, $window, parkingHttpFacade, parkingService3, car) {
	$scope.car = car.data;

  $scope.depart = function (car) {
    parkingHttpFacade.deleteCar(car)
      .success(function (data, status) {
        $location.path("/parking");
      })
      .error(function (data, status) {
        $window.location.href = "error.html";
      });
  };
});
