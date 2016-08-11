var app = angular.module('statApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl: '/static/home.html',
    controller: 'MainController'
  })
  .when('/signup', {
    templateUrl: '/static/signup.html',
    controller: 'SignupController'
  })
  .when('/login', {
    templateUrl: '/static/login.html',
    controller: 'LoginController'
  });
});

var API = 'http://localhost:3000';

app.controller('MainController', function($scope, $http, $location) {

});

app.controller('SignupController', function($scope, $http, $location) {

});

app.controller('LoginController', function($scope, $http, $location) {

});
