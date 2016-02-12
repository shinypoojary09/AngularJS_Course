'use strict';

/**
 * @ngdoc overview
 * @name signupApp
 * @description
 * # signupApp
 *
 * Main module of the application.
 */
angular.module('signupApp', [
  'ngRoute'
])
  .config([
    '$routeProvider',
    function($routeProvider){
      $routeProvider
        .when('/signup', {
          templateUrl: 'views/main.html'
        })
        .otherwise({
          redirectTo: '/',
          template: '<a href="/#/signup">Go to signup page</a>'
        });
    }
  ])