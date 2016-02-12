var ui = angular.module("ui", []);

ui.directive("alert", function () {
  return {
    restrict: 'E',
    scope: {
      topic: '@'
    },
    replace: true,
    transclude: true,
    template: 
      "<div class='alert'>" +
        "<span class='alert-topic'>" +
          "{{topic}}" +
        "</span>" +
        "<span class='alert-description' ng-transclude>" +
        "</span>" +
      "</div>"
  };
});

ui.directive("accordion", function () {
  return {
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
    },
    template: "<div ng-transclude></div>"
  };
});

ui.directive("accordionItem", function () {
  return {
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
    },
    template: 
      "<div class='accordion-item'>" +
        "{{title}}" +
      "</div>" +
      "<div " +
        "ng-show='active' " +
        "class='accordion-description' " +
        "ng-transclude" +
      ">" +
      "</div>"  
  };
});