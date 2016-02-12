parking.run(function ($rootScope) {
  $rootScope.$on("$routeChangeStart", function(event, current, previous, rejection) {
    $rootScope.loading = true;
  });
});

parking.run(function ($rootScope) {
  $rootScope.$on("$routeChangeSuccess", function(event, current, previous, rejection) {
    $rootScope.loading = false;
  });
});

parking.run(function ($rootScope, $window) {
  $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
    $window.location.href = "error.html";
  });
});

parking.run(function ($httpBackend) {
  $httpBackend.whenGET("/cars").respond([{plate: "AAA9999", color: "Blue", entrance: new Date()}, {plate: "AAA9988", color: "Blue", entrance: new Date()}]);
  $httpBackend.whenGET(/./).passThrough();
});