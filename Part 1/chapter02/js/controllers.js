parking.controller("parkingCtrl", function ($scope) {
  $scope.appTitle = "[Packt] Parking";
   
  $scope.cars = [];
        
  $scope.colors = ["White", "Black", "Blue", "Red", "Silver"];
   
  $scope.park = function (car) {
    car.entrance = new Date();
    $scope.cars.push(car);
    delete $scope.car;
  };
});