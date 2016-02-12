parking.config(function ($routeProvider) {
  $routeProvider.
    when("/parking", {
      templateUrl: "partials/parking.html",
      controller: "parkingCtrl",
      resolve: {
        "cars": function (parkingHttpFacade) {
          return parkingHttpFacade.getCars();
        }
      }
    }).
    when("/car/:id", {
      templateUrl: "partials/car.html",
      controller: "carCtrl",
      resolve: {
        "car": function (parkingHttpFacade, $route) {
          var id = $route.current.params.id;
          return parkingHttpFacade.getCar(id);
        }
      }
    }).
    otherwise({
      redirectTo: '/parking'
    });
});

parking.config(function (parkingService3Provider) {
  parkingService3Provider.setParkingRate(100);
});

parking.config(function ($httpProvider) {
  //$httpProvider.interceptors.push('httpTimestampInterceptor');
  //$httpProvider.interceptors.push('httpUnauthorizedInterceptor');
});