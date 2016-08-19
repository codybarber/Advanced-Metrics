var app = angular.module('statApp', ['ngRoute', 'ngCookies']);

var teamList;
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/login.html',
    controller: 'LoginController'
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
  .when('/dashboard/:teamId', {
    templateUrl: 'roster.html',
    controller: 'RosterController'
  })
  .when('/player-info/:playerId', {
    templateUrl: 'player.html',
    controller: 'PlayerController'
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
  .when('/add-batting-stats', {
    templateUrl: '/add-batting-stats.html',
    controller: 'StatEntryController'
  })
  .when('/add-pitching-stats', {
    templateUrl: '/add-pitching-stats.html',
    controller: 'StatEntryController'
  })
  .when('/add-defense-stats', {
    templateUrl: '/add-defense-stats.html',
    controller: 'StatEntryController'
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

var API = 'https://shrouded-headland-15271.herokuapp.com/';

app.factory('Pitching', function($http) {
  var pitch = {};

  pitch.walksPlusHitsPerInningPitched = function(hitsAllowed, walksAllowed, inningsPitched) {
    var whip = (hitsAllowed + walksAllowed) / inningsPitched;
    return whip;
  };
  pitch.earnedRunAverage = function(earnedRuns, inningsPitched) {
    var era = (earnedRuns / inningsPitched) * 9;
    return era;
  };
  pitch.ballsInPlay = function(groundBalls_allowed, flyBalls_allowed, lineDrives_allowed) {
    var bip = groundBalls_allowed + flyBalls_allowed + lineDrives_allowed;
    return bip;
  };
  pitch.groundBallPercentage = function(bip, groundBalls_allowed) {
    var gbp = groundBalls_allowed / bip;
    return gbp;
  };
  return pitch;
});

app.factory('Defense', function($http) {
  var defensive = {};
  defensive.fieldingPercentage = function(putouts, assists, errors) {
    var fp = (putouts + assists) / (putouts + assists + errors);
    return fp;
  };
  return defensive;
});

app.factory('Batting', function($http) {
  var hitting = {};
  hitting.battingAverage = function(atBats, hits) {
    var ba = hits / atBats;
    return ba;
  };
  hitting.plateAppearances = function(atBats, walks, hbp, sacrifices) {
    var pa = atBats - (walks + hbp + sacrifices);
    return pa;
  };
  hitting.walkPercentage = function(walks, plateAppearances) {
    var wp = walks / plateAppearances;
    return wp;
  };
  hitting.strikeoutPercentage = function(strikeouts, plateAppearances) {
    var sop = strikeouts / plateAppearances;
    return sop;
  };
  hitting.sluggingPercentage = function(homeruns, singles, doubles, triples, atBats) {
    var slg = ((singles) + (doubles * 2) + (triples * 3) + (homeruns * 4)) / atBats;
    return slg;
  };
  hitting.isolatedPower = function(sluggingPercentage, battingAverage) {
    var iso = sluggingPercentage - battingAverage;
    return iso;
  };
  hitting.babip = function(hits, homeruns, atBats, strikeouts, sacrificeFlys) {
    var babip = (hits - homeruns) / (atBats - strikeouts - homeruns + sacrificeFlys);
    return babip;
  };
  hitting.onBasePercentage = function(hits, walks, hitByPitch, atBats, sacrificeFlys) {
    var obp = (hits + walks + hitByPitch) / (atBats + walks + hitByPitch + sacrificeFlys);
    return obp;
  };
  hitting.runsCreated = function(hits, walks, singles, doubles, triples, homeruns, atBats) {
    var rc = ((hits + walks) * ((singles) + (doubles * 2) + (triples * 3) + (homeruns * 4))) / (atBats + walks);
    return rc;
  };
  hitting.onBasePlusSlugging = function(onBasePercentage, sluggingPercentage) {
    var ops = onBasePercentage + sluggingPercentage;
    return ops;
  };
  hitting.weightedOnBaseAverage = function(walks, hitByPitch, singles, doubles, triples, homeruns, atBats, intentionalWalks, sacrificeFlys) {
    var woba = ((0.689 * walks) + (0.720 * hitByPitch) + (0.878 * singles) + (1.244 + doubles) + (1.573 + triples) + (2.024 + homeruns)) / (atBats + walks - intentionalWalks + sacrificeFlys + hitByPitch);
    return woba;
  };
  hitting.weightedRunsAboveAverage = function(weightedOnBaseAverage) {
    var wraa = (weightedOnBaseAverage - 0.317) / 1.25;
    return wraa;
  };
  return hitting;
});

var teamId;

app.controller('MainController', function($scope, $http, $location, $cookies) {
  $scope.logout = function() {
    $cookies.remove('auth_token');
    $location.path('/login');
  };
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
      $location.path('/dashboard');
      console.log(data2);
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
  })
  .catch(function(error) {
    console.log(error.message);
  });

  $scope.goToTeam = function(teamId) {
    $cookies.put('team_id', teamId);
    $location.path('/dashboard/:' + teamId);
  };
});

app.controller('RosterController', function($scope, $location, $http, $cookies, Batting, Pitching, Defense) {
  var team = $cookies.get('team_id');
  var bStats = [];
  $http({
    url: API + '/team-roster/' + team,
    method: 'POST'
  })
  .success(function(data) {
    bStats = data;
    for (var i = 0; i < bStats.length; i++) {
      bStats[i].BA = Batting.battingAverage(bStats[i].AB, bStats[i].H);
      if (Number.isNaN(bStats[i].BA)) {
        bStats[i].BA = '---';
      } else {
        bStats[i].BA = bStats[i].BA.toFixed(3);
      }
      bStats[i].ERA = Pitching.earnedRunAverage(bStats[i].ER, bStats[i].IP);
      if (Number.isNaN(bStats[i].ERA)) {
        bStats[i].ERA = '---';
      } else {
        bStats[i].ERA = bStats[i].ERA.toFixed(3);
      }

    }
    console.log("TEAM ROSTER: ",bStats);
    $scope.bStats = bStats;
  })
  .catch(function(error) {
    console.log(error.message);
  });

  $scope.goToPlayer = function(playerId) {
    $cookies.put('player_id', playerId);
    $location.path('/player-info/:' + playerId);
  };

});

app.controller('PlayerController', function($scope, $location, $http, $cookies, Batting, Pitching, Defense) {
  var player = $cookies.get('player_id');
  var stats;
  console.log(player);
  $http({
    url: API + '/player-info/' + player,
    method: 'POST'
  })
  .success(function(data) {
    stats = data[0];
    console.log(data);

    // Offensive Stat Calculations
    stats.BA = Batting.battingAverage(stats.AB, stats.H);
    if (Number.isNaN(stats.BA)) {
      stats.BA = '---';
    } else {
      stats.BA = stats.BA.toFixed(3);
    }
    stats.PA = Batting.plateAppearances(stats.AB, stats.BB, stats.HBP, stats.sacrifices);
    stats.OBP = Batting.onBasePercentage(stats.H, stats.BB, stats.HBP, stats.AB, stats.sacrifices);
    if (Number.isNaN(stats.OBP)) {
      stats.OBP = '---';
    } else {
      stats.OBP = stats.OBP.toFixed(3);
    }
    stats.SLG = Batting.sluggingPercentage(stats.HR, stats.singles, stats.doubles, stats.triples, stats.AB);
    if (Number.isNaN(stats.SLG)) {
      stats.SLG = '---';
    } else {
      stats.SLG = stats.SLG.toFixed(3);
    }
    stats.OPS = Batting.onBasePlusSlugging(stats.OBP, stats.SLG);
    if (Number.isNaN(stats.OPS)) {
      stats.OPS = '---';
    } else {
      stats.OPS = stats.OPS;
    }
    stats.BABIP = Batting.babip(stats.H, stats.HR, stats.AB, stats.SO, stats.sacrifices);
    if (Number.isNaN(stats.BABIP)) {
      stats.BABIP = '---';
    } else {
      stats.BABIP = stats.BABIP.toFixed(3);
    }
    stats.BBperc = Batting.walkPercentage(stats.BB, stats.PA);
    if (Number.isNaN(stats.BBperc)) {
      stats.BBperc = '---';
    } else {
      stats.BBperc = stats.BBperc.toFixed(3);
    }
    stats.SOperc = Batting.strikeoutPercentage(stats.SO, stats.PA);
    if (Number.isNaN(stats.SOperc)) {
      stats.SOperc = '---';
    } else {
      stats.SOperc = stats.SOperc.toFixed(3);
    }
    stats.ISO = Batting.isolatedPower(stats.SLG, stats.BA);
    if (Number.isNaN(stats.ISO)) {
      stats.ISO = '---';
    } else {
      stats.ISO = stats.ISO.toFixed(3);
    }
    stats.RC = Batting.runsCreated(stats.H, stats.BB, stats.singles, stats.doubles, stats.triples, stats.HR, stats.AB);
    stats.RC = stats.RC.toFixed(3);

    stats.wOBA = Batting.weightedOnBaseAverage(stats.BB, stats.HBP, stats.singles, stats.doubles, stats.triples, stats.HR, stats.AB, stats.IBB, stats.sacrifices);
    if (Number.isNaN(stats.wOBA)) {
      stats.wOBA = '---';
    } else {
      stats.wOBA = stats.wOBA.toFixed(3);
    }
    stats.wRAA = Batting.weightedRunsAboveAverage(stats.wOBA);
    if (Number.isNaN(stats.wRAA)) {
      stats.wRAA = '---';
    } else {
      stats.wRAA = stats.wRAA.toFixed(3);
    }

    // Pitching Stat Calculations
    stats.WHIP = Pitching.walksPlusHitsPerInningPitched(stats.H_allowed, stats.BB_allowed, stats.IP);
    if (Number.isNaN(stats.WHIP)) {
      stats.WHIP = '---';
    } else {
      stats.WHIP = stats.WHIP.toFixed(3);
    }
    stats.ERA = Pitching.earnedRunAverage(stats.ER, stats.IP);
    if (Number.isNaN(stats.ERA)) {
      stats.ERA = '---';
    } else {
      stats.ERA = stats.ERA.toFixed(3);
    }
    stats.BIP = Pitching.ballsInPlay(stats.groundBalls_allowed, stats.flyBalls_allowed, stats.lineDrives_allowed);
    stats.GBperc = Pitching.groundBallPercentage(stats.BIP, stats.groundBalls_allowed);
    if (Number.isNaN(stats.GBperc)) {
      stats.GBperc = '---';
    } else {
      stats.GBperc = stats.GBperc.toFixed(3);
    }

    // Defensive Stat Calculations
    stats.fielding_perc = Defense.fieldingPercentage(stats.PO, stats.A, stats.E);
    if (Number.isNaN(stats.fielding_perc)) {
      stats.fielding_perc = '---';
    } else {
      stats.fielding_perc = stats.fielding_perc.toFixed(3);
    }
    $scope.stats = stats;
  })
  .catch(function(error) {
    console.log(error.message);
  });
});

app.controller('AddTeamController', function($scope, $http, $location, $cookies) {
  $scope.submit = function() {
    $http({
      url: API + '/add-new-team',
      method: 'POST',
      data: {
        name: $scope.teamName,
        level: $scope.teamLevel,
        location: $scope.teamLocation,
        sport: $scope.teamSport,
        statter: $cookies.get('user_id')
      }
    })
    .success(function(data) {
      $scope.teamInfo = data;
      console.log('client side: ', $scope.teamInfo);
      teamId = $scope.teamInfo.id;
      $cookies.put('team_id', teamId);
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
        team: $cookies.get('team_id')
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
    $location.path('/dashboard');
  };
});


app.controller('StatEntryController', function($scope, $http, $location, $cookies, Batting) {

  var teamId = $cookies.get('team_id');
  $http({
    url: API + '/get-roster',
    method: 'POST',
    data: {
      team: teamId
    }
  })
  .success(function(data) {
    $scope.teamRoster = data;
  })
  .catch(function(error) {
    console.log(error.message);
  });

  $scope.showForm = function(player) {
    if (!player.editing) {
      player.editing = true;
    } else {
      player.editing = false;
    }
  };

  $scope.submitBattingStats = function(player) {
    $http({
      url: API + '/add-batting-stats',
      method: 'POST',
      data: player
    })
    .success(function(data) {
      console.log("Batting Stats submitted");
    })
    .catch(function(error) {
      console.log(error.message);
    });
  };

  $scope.goToPitching = function() {
    $location.path('/add-pitching-stats');
  };

  $scope.goToDefense = function() {
    $location.path('/add-defense-stats');
  };

  $scope.goToDashboard = function() {
    $location.path('/dashboard');
  };

  $scope.submitPitchingStats = function(player) {
    $http({
      url: API + '/add-pitching-stats',
      method: 'POST',
      data: player
    })
    .success(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.log(error.message);
    });
  };

  $scope.submitDefenseStats = function(player) {
    $http({
      url: API + '/add-defense-stats',
      method: 'POST',
      data: player
    })
    .success(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.log(error.message);
    });
  };

});

app.controller('StatDisplayController', function($scope, $http, $location) {

  var bStats = [];

  $scope.calcBattingStats = function() {
    $http({
      url: API + '/calc-batting-stats',
      method: 'POST',
      data: {
        team: $cookies.get('team_id')
      }
    })
    .success(function(data) {
      bStats = data;
      console.log("ARRAY: ",bStats);
      for (var i = 0; i < bStats.length; i++) {

        // BA
        bStats[i].BA = Batting.battingAverage(bStats[i].AB, bStats[i].H);

        // PA
        bStats[i].PA = Batting.plateAppearances(bStats[i].AB, bStats[i].BB, bStats[i].HBP, bStats[i].sacrifices);

        // OBP
        bStats[i].OBP = Batting.onBasePercentage(bStats[i].H, bStats[i].BB, bStats[i].HBP, bStats[i].AB, bStats[i].sacrifices);

        // SLG
        bStats[i].SLG = Batting.sluggingPercentage(bStats[i].HR, bStats[i].singles, bStats[i].doubles, bStats[i].triples, bStats[i].AB);

        // OPS
        bStats[i].OPS = Batting.onBasePlusSlugging(bStats[i].OBP, bStats[i].SLG);

        // BABIP
        bStats[i].BABIP = Batting.babip(bStats[i].H, bStats[i].HR, bStats[i].AB, bStats[i].SO, bStats[i].sacrifices);

        // BB%
        bStats[i].BBperc = Batting.walkPercentage(bStats[i].BB, bStats[i].PA);

        // SO%
        bStats[i].SOperc = Batting.strikeoutPercentage(bStats[i].SO, bStats[i].PA);

        // ISO
        bStats[i].ISO = Batting.isolatedPower(bStats[i].SLG, bStats[i].BA);

        // RC
        bStats[i].RC = Batting.runsCreated(bStats[i].H, bStats[i].BB, bStats[i].singles, bStats[i].doubles, bStats[i].triples, bStats[i].HR, bStats[i].AB);

        // wOBA
        bStats[i].wOBA = Batting.weightedOnBaseAverage(bStats[i].BB, bStats[i].HBP, bStats[i].singles, bStats[i].doubles, bStats[i].triples, bStats[i].HR, bStats[i].AB, bStats[i].IBB, bStats[i].sacrifices);

        // wRAA
        bStats[i].wRAA = Batting.weightedRunsAboveAverage(bStats[i].wOBA);
      }
    })
    .catch(function(error) {
      console.log(error.message);
    });
  };

  $scope.calcPitchingStats = function() {
    $http({
      url: API + '/calc-pitching-stats',
      method: 'POST'
    })
    .success(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.log(error.message);
    });
  };

  $scope.calcDefenseStats = function() {
    $http({
      url: API + '/calc-defense-stats',
      method: 'POST'
    })
    .success(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.log(error.message);
    });
    $location.path('/team-roster');
  };
});

app.run(function($rootScope, $location, $cookies) {
  $rootScope.$on('$locationChangeStart', function(event, nextUrl, currentUrl) {
    currentUrl = currentUrl.split('#');
    nextUrl = nextUrl.split('#');
    token = $cookies.get('auth_token');
    if (token === undefined) {
      if (nextUrl[1] === '/') {
        $location.path('login');
      } else if (nextUrl[1] === '/login') {
        $location.path('/login');
      } else if (nextUrl[1] === '/signup') {
        $location.path('/signup');
      } else if (nextUrl[1] === '/dashboard' || nextUrl[1] === '/player' || nextUrl[1] === '/roster' || nextUrl[1] === '/add-batting-stats' || nextUrl[1] === '/add-pitching-stats' || nextUrl[1] === '/add-defense-stats') {
        $location.path('/login');
      }
    }
    if (token !== undefined) {
      $location.path(nextUrl[1]);
    }
    $cookies.put('nextUrl', nextUrl[1]);
  });
});
