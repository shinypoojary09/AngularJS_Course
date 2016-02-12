var search = angular.module("search", []);

search.factory('searchService', function ($timeout, $q) {
  var _filter = function (entities, criteria) {
    var deferred = $q.defer();
    $timeout(function () {
      var result = [];
      angular.forEach(entities, function (entity) {
        if (_matches(entity, criteria)) {
          result.push(entity);
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

  var _matches = function (entity, criteria) {
    return angular.toJson(entity).indexOf(criteria) > 0;
  };

  return {
    filter: _filter
  }
});