var app = angular.module('statApp', ['ngRoute', 'ngCookies']);

var teamList;
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
  .when('/dashboard', {
    templateUrl: '/dashboard.html',
    controller: 'DashboardController'
  })
  .when('/add-team', {
    templateUrl: '/add-team.html',
    controller: 'AddTeamController'
  })
  .when('/add-player', {
    templateUrl: '/add-player.html',
    controller: 'AddTeamController'
  })
  .when('/team-roster', {
    templateUrl: '/team-roster.html',
    controller: 'RosterController'
  })
  .when('/add-game-stats', {
    templateUrl: '/add-game-stats.html',
    controller: 'AddTeamController'
  })
  .when('/stat-entry', {
    templateUrl: '/stat-entry.html',
    controller: 'StatEntryController'
  })
  .when('/stat-display', {
    templateUrl: '/stat-display.html',
    controller: 'StatDisplayController'
  })
  .when('/confirm-team', {
    templateUrl: '/confirm-team.html',
    controller: 'AddTeamController'
  });
});

var API = 'http://localhost:8000';

// app.factory('batting', function($http) {
//   var hitting = {};
//   hitting.battingAverage = function(atBats, hits) {
//     var ba = hits / atBats;
//     return ba;
//   }
//   hitting.walkPercentage = function(walks, plateAppearances) {
//     var wp = walks / plateAppearances;
//     return wp;
//   }
//   hitting.strikeoutPercentage = function(strikeouts, plateAppearances) {
//     var sop = strikeouts / plateAppearances;
//     return sop;
//   }
//   hitting.sluggingPercentage = function(totalBases, atBats) {
//     var slg = totalBases / atBats;
//     return slg;
//   }
//   hitting.isolatedPower = function(sluggingPercentage, battingAverage) {
//     var iso = sluggingPercentage - battingAverage;
//     return iso;
//   }
//   hitting.babip = function(hits, homeruns, atBats, strikeouts, sacrificeFlys) {
//     var babip = (hits - homeruns) / (atBats - strikeouts - homeruns + sacrificeFlys);
//     return babip;
//   }
//   hitting.onBasePercentage = function(hits, walks, hitByPitch, atBats, sacrificeFlys) {
//     var obp = (hits + walks + hitByPitch) / (atBats + walks + hitByPitch + sacrificeFlys);
//     return obp;
//   }
//   hitting.runsCreated = function(hits, walks, totalBases, atBats) {
//     var rc = ((hits + walks) * totalBases) / (atBats + walks);
//     return rc;
//   }
//   hitting.onBasePlusSlugging = function(onBasePercentage, sluggingPercentage) {
//     var ops = onBasePercentage + sluggingPercentage;
//     return ops;
//   }
//   hitting.weightedOnBaseAverage = function(walks, hitByPitch, singles, doubles, triples, homeruns, atBats, intentionalWalks, sacrificeFlys) {
//     var woba = ((0.689 * walks) + (0.720 * hitByPitch) + (0.878 * singles) + (1.244 + doubles) + (1.573 + triples) + (2.024 + homeruns)) / (atBats + walks - intentionalWalks + sacrificeFlys + hitByPitch);
//     return woba;
//   }
//   hitting.weightedRunsAboveAverage = function(weightedOnBaseAverage) {
//     var wraa = (weightedOnBaseAverage - 0.317) / 1.25;
//     return wraa;
//   }
// });

var teamId;

app.controller('MainController', function($scope, $http, $location) {

});

app.controller('SignupController', function($scope, $http, $location) {
  $scope.createAccount = function() {
    if ($scope.password !== $scope.confirmPassword) {
      $location.path('/signup');
    } else {
      $http({
        url: API + '/create-account',
        method: 'POST',
        data: {
          username: $scope.userName,
          password: $scope.password,
          email: $scope.email
        }
      })
      .success(function(data) {
        console.log('success');
        $location.path('/login');
      })
      .catch(function(error) {
        console.log(error.message);
        $location.path('/signup');
      });
      $location.path('/login');
    }
  };
});

app.controller('LoginController', function($scope, $http, $location, $cookies) {

  $scope.login = function() {
    $http({
      url: API + '/sign-in',
      method: 'POST',
      data: {
        username: $scope.username,
        password: $scope.password
      }
    })
    .success(function(data2) {
      console.log("Successfully signed in");
      // $scope.username = data2;
      $location.path('/dashboard');
      console.log(data2);
      // debugger
      $cookies.put('auth_token', data2.auth_token);
      $cookies.put('user_id', data2.id);
    })
    .catch(function(error) {
      console.log(error.message);
    });
  };
});

app.controller('DashboardController', function($scope, $http, $location, $cookies) {
  var statter = $cookies.get('user_id');
  $http({
    url: API + '/get-teams',
    method: 'POST',
    data: {
      statter: statter
    }
  })
  .success(function(data) {
    $scope.teams = data;
    console.log($scope.teams);
  })
  .catch(function(error) {
    console.log(error.message);
  });
});

app.controller('AddTeamController', function($scope, $http, $location, $cookies) {
  var statter = $cookies.get('user_id');
  $scope.submit = function() {
    $http({
      url: API + '/add-new-team',
      method: 'POST',
      data: {
        name: $scope.teamName,
        level: $scope.teamLevel,
        location: $scope.teamLocation,
        sport: $scope.teamSport,
        statter: statter
      }
    })
    .success(function(data) {
      $scope.teamInfo = data;
      console.log('client side: ', $scope.teamInfo);
      teamId = $scope.teamInfo.id;
    })
    .catch(function(error) {
      console.log(error.message);
    });
    $location.path('/add-player');
  };

  $scope.playerList = [];

  $scope.submitPlayer = function() {
    console.log("teamId: ", teamId);
    $http({
      url: API + '/add-new-player',
      method: 'POST',
      data: {
        name: $scope.playerName,
        age: $scope.playerAge,
        number: $scope.playerNumber,
        team: teamId
      }
    })
    .success(function(data) {
      console.log('success');
      $scope.playerList.push(data);
      console.log($scope.playerList);
      $('#playerForm').each(function(){
        this.reset();
      });
    })
    .catch(function(error) {
      console.log(error);
    });
    $location.path('/add-player');
  };

  $scope.finished = function() {
    $location.path('/team-roster');
  };



});

app.controller('RosterController', function($scope, $http, $location) {
  $http({
    url: API + '/get-roster',
    method: 'POST',
    data: {
      team: teamId
    }
  })
  .success(function(data) {
    console.log('success');
    $scope.roster = data;
    console.log($scope.roster);
  })
  .catch(function(error) {
    console.log(error);
  });
});

app.controller('StatEntryController', function($scope, $http, $location) {

});

app.controller('StatDisplayController', function($scope, $http, $location) {

});
