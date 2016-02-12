parking.factory("parkingService1", function (parkingConfig) {
  var _calculateTicket = function (car) {
    var departHour = new Date().getHours();
    var entranceHour = car.entrance.getHours();
    var parkingPeriod = departHour - entranceHour + 1;
    var parkingPrice = parkingPeriod * parkingConfig.parkingRate;
    return {
      period: parkingPeriod,
      price: parkingPrice
    };
  };

  return {
    calculateTicket: _calculateTicket
  };
});

parking.service("parkingService2", function (parkingConfig) {
  this.calculateTicket = function (car) {
    var departHour = new Date().getHours();
    var entranceHour = car.entrance.getHours();
    var parkingPeriod = departHour - entranceHour + 1;
    var parkingPrice = parkingPeriod * parkingConfig.parkingRate;
    return {
      period: parkingPeriod,
      price: parkingPrice
    };
  };
});

parking.provider("parkingService3", function (parkingConfig) {
  var _parkingRate = parkingConfig.parkingRate;

  var _calculateTicket = function (car) {
    var departHour = new Date().getHours();
    var entranceHour = car.entrance.getHours();
    var parkingPeriod = departHour - entranceHour + 1;
    var parkingPrice = parkingPeriod * _parkingRate;
    return {
      period: parkingPeriod,
      price: parkingPrice
    };
  };
  this.setParkingRate = function (rate) {
    _parkingRate = rate;
  };
  this.$get = function () {
    return {
      calculateTicket: _calculateTicket
    };
  };
});

parking.factory("parkingHttpFacade", function ($http) {
  var _getCars = function () {
    return $http.get("/cars");
  };

  var _getCar = function (id) {
    return $http.get("/cars/" + id);
  };

  var _saveCar = function (car) {
    return $http.post("/cars", car);
  };

  var _updateCar = function (car) {
    return $http.put("/cars/" + car.id, car);
  };

  var _deleteCar = function (id) {
    return $http.delete("/cars/" + id);
  };


  return {
    getCars: _getCars,
    getCar: _getCar,
    saveCar: _saveCar,
    updateCar: _updateCar,
    deleteCar: _deleteCar
  };
});

parking.factory('httpTimestampInterceptor', function(){
  return{
    'request' : function(config) {
      var timestamp = Date.now();
      config.url = config.url + "?x=" + timestamp;
      return config;
    }
  }
});

parking.factory('httpUnauthorizedInterceptor', function($q, $rootScope){
  return{
    'responseError' : function(rejection) {
   if (rejection.status === 401){
     $rootScope.login = true;
   } 
   return $q.reject(rejection);
    }
  }
});

parking.factory('carSearchService1', function ($timeout) {
  var filterPromise;

  var _filter = function (cars, criteria, resultCallback) {
    $timeout.cancel(filterPromise);
    filterPromise = $timeout(function () {
      var result = [];
      angular.forEach(cars, function (car) {
        if (_matches(car, criteria)) {
          result.push(car);
        }
      });
      resultCallback(result);
    }, 1000);
  };

  var _matches = function (car, criteria) {
    return angular.toJson(car).indexOf(criteria) > 0;
  };

  return {
    filter: _filter
  }
});

parking.factory('carSearchService2', function ($timeout, $q) {
  var _filter = function (cars, criteria) {
    var deferred = $q.defer();
    $timeout(function () {
      var result = [];
      angular.forEach(cars, function (car) {
        if (_matches(car, criteria)) {
          result.push(car);
        }
      });
      if (result.length > 0) {
        deferred.resolve(result);
      } else {
        deferred.reject("No results were found!");
      }
    }, 1000);
    return deferred.promise;
  };

  var _matches = function (car, criteria) {
    return angular.toJson(car).indexOf(criteria) > 0;
  };

  return {
    filter: _filter
  }
});

parking.factory("tickGenerator", function($rootScope, $timeout) {
  var _tickTimeout;

  var _start = function () {
    _tick();
  };

  var _tick = function () {
    $rootScope.$broadcast("TICK", new Date());  
    _tickTimeout = $timeout(_tick, 1000); 
  };

  var _stop = function () {
    $timeout.cancel(_tickTimeout);
  };

  var _listenToStop = function () {
    $rootScope.$on("STOP_TICK", function (event, data) {
      _stop();
    });
  };

  _listenToStop();

  return {
    start: _start,
    stop: _stop
  };
});
