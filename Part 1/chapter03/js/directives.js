parking.directive("alert", function () {
  return {
    restrict: 'E',
 scope: {
   topic: '@'
 },
 templateUrl: "alert.html",
 replace: true,
 transclude: true
  };
});

parking.directive("accordionItem", function () {
  return {
    templateUrl: "accordionItem.html",
    restrict: "E",
    scope: {
      title: "@"
    },
    transclude: true,
    require: "^accordion",
    link: function (scope, element, attrs, ctrl, transcludeFn) {
      ctrl.addAccordionItem(scope);
      element.bind("click", function () {
        ctrl.closeAll();
        scope.$apply(function () {
          scope.active = !scope.active;
        });
      });
    }
  };
});


parking.directive("accordion", function () {
  return {
    template: "<div ng-transclude></div>",
 restrict: "E",
 transclude: true,
    controller: function ($scope, $element, $attrs, $transclude) {
      var accordionItens = [];

      var addAccordionItem = function (accordionScope) {
        accordionItens.push(accordionScope);
      };
   
      var closeAll = function () {
        angular.forEach(accordionItens, function (accordionScope) {
          accordionScope.active = false;
        });
      };
   
      return {
        addAccordionItem: addAccordionItem,
        closeAll: closeAll
      };
    }  
  };
});
