
var app = angular.module('statApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl: '/home.html',
    controller: 'MainController'
  })
  .when('/signup', {
    templateUrl: '/signup.html',
    controller: 'SignupController'
  })
  .when('/login', {
    templateUrl: '/login.html',
    controller: 'LoginController'
  })
  .when('/add-team', {
    templateUrl: '/add-team.html',
    controller: 'AddTeamController'
  })
  .when('/add-player', {
    templateUrl: '/add-player.html',
    controller: 'AddPlayerController'
  })
  .when('/add-game-stats', {
    templateUrl: '/add-game-stats.html',
    controller: 'MainController'
  })
  .when('/stat-entry', {
    templateUrl: '/stat-entry.html',
    controller: 'StatEntryController'
  })
  .when('/stat-display', {
    templateUrl: '/stat-display.html',
    controller: 'StatDisplayController'
  });
});

var API = 'http://localhost:8000';

app.factory('batting', function($http) {
  var hitting = {};
  hitting.battingAverage = function(atBats, hits) {
    var ba = hits / atBats;
    return ba;
  }
  hitting.walkPercentage = function(walks, plateAppearances) {
    var wp = walks / plateAppearances;
    return wp;
  }
  hitting.strikeoutPercentage = function(strikeouts, plateAppearances) {
    var sop = strikeouts / plateAppearances;
    return sop;
  }
  hitting.sluggingPercentage = function(totalBases, atBats) {
    var slg = totalBases / atBats;
    return slg;
  }
  hitting.isolatedPower = function(sluggingPercentage, battingAverage) {
    var iso = sluggingPercentage - battingAverage;
    return iso;
  }
  hitting.babip = function(hits, homeruns, atBats, strikeouts, sacrificeFlys) {
    var babip = (hits - homeruns) / (atBats - strikeouts - homeruns + sacrificeFlys);
    return babip;
  }
  hitting.onBasePercentage = function(hits, walks, hitByPitch, atBats, sacrificeFlys) {
    var obp = (hits + walks + hitByPitch) / (atBats + walks + hitByPitch + sacrificeFlys);
    return obp;
  }
  hitting.runsCreated = function(hits, walks, totalBases, atBats) {
    var rc = ((hits + walks) * totalBases) / (atBats + walks);
    return rc;
  }
  hitting.onBasePlusSlugging = function(onBasePercentage, sluggingPercentage) {
    var ops = onBasePercentage + sluggingPercentage;
    return ops;
  }
  hitting.weightedOnBaseAverage = function(walks, hitByPitch, singles, doubles, triples, homeruns, atBats, intentionalWalks, sacrificeFlys) {
    var woba = ((0.689 * walks) + (0.720 * hitByPitch) + (0.878 * singles) + (1.244 + doubles) + (1.573 + triples) + (2.024 + homeruns)) / (atBats + walks - intentionalWalks + sacrificeFlys + hitByPitch);
    return woba;
  }
  hitting.weightedRunsAboveAverage = function(weightedOnBaseAverage) {
    var wraa = (weightedOnBaseAverage - 0.317) / 1.25;
    return wraa;
  }
});

app.controller('MainController', function($scope, $http, $location) {

});

app.controller('SignupController', function($scope, $http, $location) {

});

app.controller('LoginController', function($scope, $http, $location) {

});

app.controller('AddTeamController', function($scope, $http, $location) {

});

app.controller('AddPlayerController', function($scope, $http, $location) {

});

app.controller('StatEntryController', function($scope, $http, $location) {

});

app.controller('StatDisplayController', function($scope, $http, $location) {
  $http.post(API + '/get-stats')
  .success(function(data) {
    $scope.stats = data;
    console.log($scope.stats);
  })
  .catch(function(error) {
    console.log(error);
  });

});

// app.run(function($rootScope, $location, $cookies) {
//
// });
