var express = require('express');
var app = express();
var pgp = require('pg-promise')();
var bcrypt = require('my-bcrypt');
var bodyParser = require('body-parser');
var cors = require('cors');
var randomtoken = require('rand-token');
require('dotenv').config();

var cn = {
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: true
};

var db = pgp(cn);

var port = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(cors());

app.post('/player-info/:playerId', function(request, response) {
  console.log(request.params.playerId);

  db.any(
    `SELECT
    *
    FROM
    batting
    LEFT OUTER JOIN
    players on batting.player_id = players.id
    LEFT OUTER JOIN
    pitching on players.id = pitching.player_id
    LEFT OUTER JOIN
    defense on pitching.player_id = defense.player_id
    WHERE
    players.id = $1`, request.params.playerId)
  .then(function(data) {
    console.log(data);
    response.send(data);
  })
  .catch(function(error) {
    console.log(error.message);
  });
});

app.post('/team-roster/:teamId', function(request, response) {
  console.log(request.params.teamId);
  db.any(

    `SELECT
    *
    FROM
    batting
    LEFT OUTER JOIN
    players on batting.player_id = players.id
    LEFT OUTER JOIN
    pitching on players.id = pitching.player_id
    LEFT OUTER JOIN
    defense on pitching.player_id = defense.player_id
    WHERE
    team_id = $1`, request.params.teamId)
  .then(function(data) {
    console.log(data);
    response.send(data);
  })
  .catch(function(error) {
    console.log(error.message);
  });
});


app.post('/sign-in', function(request, response) {

  var uid = '';
  var token = '';

  console.log('jfksdlf', request.body);
  db.one('SELECT id, username, password FROM statters WHERE username = $1 and password = $2', [request.body.username, request.body.password])
  .then(function(data) {
    console.log('User Found. Signing In!');
    uid = require('rand-token').uid;
    token = uid(64);
    return db.one('INSERT INTO auth_tokens (statter_id, auth_token) VALUES ($1, $2) RETURNING auth_token', [data.id, token])
    .then(function(data2) {
      // console.log(data);
      console.log(data2.auth_token);
      response.send({
        id: data.id,
        auth_token: data2.auth_token
      });
    });
  })
  .catch(function(error) {
    console.log("Sign in error: ",error.message);
  });
});

app.post('/create-account', function(request, response) {
  db.one('INSERT INTO statters(username, password, email) VALUES($1, $2, $3) RETURNING id, username', [request.body.username, request.body.password, request.body.email])
  .then(function(data) {
    response.send(data);
  })
  .catch(function(error) {
    console.log("Account creation error: ", error.message);
  });
});

app.post('/add-batting-stats', function(request, response) {
  // console.log(request.body);
  db.any(
    `INSERT INTO
    batting("G", "AB", "R", "H", "singles", "doubles", "triples", "HR", "RBI", "BB", "SO", "ground_balls", "fly_balls", "line_drives", "HBP", "IBB", "SB", "CS", "sacrifices", player_id)
    VALUES
    (1, $(AB), $(R), $(H), $(singles), $(doubles), $(triples), $(HR), $(RBI), $(BB), $(SO), $(ground_balls), $(fly_balls), $(line_drives), $(HBP), $(IBB), $(SB), $(CS), $(sacrifices), $(id))
    ON CONFLICT
    (player_id)
    DO UPDATE SET
    "G" = coalesce(batting."G", 0) + EXCLUDED."G",
    "AB" = coalesce(batting."AB", 0) + EXCLUDED."AB",
    "R" = coalesce(batting."R", 0) + EXCLUDED."R",
    "H" = coalesce(batting."H", 0) + EXCLUDED."H",
    "singles" = coalesce(batting."singles", 0) + EXCLUDED."singles",
    "doubles" = coalesce(batting."doubles", 0) + EXCLUDED."doubles",
    "triples" = coalesce(batting."triples", 0) + EXCLUDED."triples",
    "HR" = coalesce(batting."HR", 0) + EXCLUDED."HR",
    "RBI" = coalesce(batting."RBI", 0) + EXCLUDED."RBI",
    "BB" = coalesce(batting."BB", 0) + EXCLUDED."BB",
    "SO" = coalesce(batting."SO", 0) + EXCLUDED."SO",
    "ground_balls" = coalesce(batting."ground_balls", 0) + EXCLUDED."ground_balls",
    "fly_balls" = coalesce(batting."fly_balls", 0) + EXCLUDED."fly_balls",
    "line_drives" = coalesce(batting."line_drives", 0) + EXCLUDED."line_drives",
    "HBP" = coalesce(batting."HBP", 0) + EXCLUDED."HBP",
    "IBB" = coalesce(batting."IBB", 0) + EXCLUDED."IBB",
    "SB" = coalesce(batting."SB", 0) + EXCLUDED."SB",
    "CS" = coalesce(batting."CS", 0) + EXCLUDED."CS",
    "sacrifices" = coalesce(batting."sacrifices", 0) + EXCLUDED."sacrifices"`, request.body)
  .then(function(data) {
    console.log(data);
    console.log("SSUUCCCCEESSSS");
  })
  .catch(function(error) {
    console.log("ERROR: ",error);
  });
});

app.post('/calc-batting-stats', function(request, response) {
  db.any(
    `SELECT
    *
    FROM
    batting
    LEFT OUTER JOIN
    players on batting.player_id = players.id
    WHERE
    players.team_id = $1
    `, (request.body.team))
  .then(function(data) {
    console.log("BIG SELECTION: ",data);
    response.send(data);
  })
  .catch(function(error) {
    console.log(error.message);
  });
});

app.post('/add-pitching-stats', function(request, response) {
  console.log(request.body);
  request.body.W = request.body.W || 0;
  if (request.body.W === true) {
    request.body.W = 1;
  } else {
    request.body.W = 0;
  }
  request.body.L = request.body.L || 0;
  if (request.body.L === true) {
    request.body.L = 1;
  } else {
    request.body.L = 0;
  }
  request.body.S = request.body.S || 0;
  if (request.body.S === true) {
    request.body.S = 1;
  } else {
    request.body.S = 0;
  }
  request.body.CG = request.body.CG || 0;
  db.any(
    `INSERT INTO
    pitching("G", "W", "L", "CG", "S", "IP", "H", "R", "ER", "BB", "K", "BF", "HR", "ground_balls", "fly_balls", "line_drives", "run_support", player_id)
    VALUES
    (1, $(W), $(L), $(CG), $(S), $(IP), $(H), $(R), $(ER), $(BB), $(K), $(BF), $(HR), $(ground_balls), $(fly_balls), $(line_drives), $(run_support), $(id))
    ON CONFLICT
    (player_id)
    DO UPDATE SET
    "G" = coalesce(pitching."G", 0) + EXCLUDED."G",
    "W" = coalesce(pitching."W", 0) + EXCLUDED."W",
    "L" = coalesce(pitching."L", 0) + EXCLUDED."L",
    "CG" = coalesce(pitching."CG", 0) + EXCLUDED."CG",
    "S" = coalesce(pitching."S", 0) + EXCLUDED."S",
    "IP" = coalesce(pitching."IP", 0) + EXCLUDED."IP",
    "H" = coalesce(pitching."H", 0) + EXCLUDED."H",
    "R" = coalesce(pitching."R", 0) + EXCLUDED."R",
    "ER" = coalesce(pitching."ER", 0) + EXCLUDED."ER",
    "BB" = coalesce(pitching."BB", 0) + EXCLUDED."BB",
    "K" = coalesce(pitching."K", 0) + EXCLUDED."K",
    "BF" = coalesce(pitching."BF", 0) + EXCLUDED."BF",
    "HR" = coalesce(pitching."HR", 0) + EXCLUDED."HR",
    "ground_balls" = coalesce(pitching."ground_balls", 0) + EXCLUDED."ground_balls",
    "fly_balls" = coalesce(pitching."fly_balls", 0) + EXCLUDED."fly_balls",
    "line_drives" = coalesce(pitching."line_drives", 0) + EXCLUDED."line_drives",
    "run_support" = coalesce(pitching."run_support", 0) + EXCLUDED."run_support"`, request.body)
  .then(function(data) {
    console.log(data);
    console.log("SSUUCCCCEESSSS");
  })
  .catch(function(error) {
    console.log("ERROR: ",error);
  });
});

app.post('/calc-pitching-stats', function(request, response) {
  db.any(
    `SELECT
    *
    FROM
    pitching
    LEFT OUTER JOIN
    players on pitching.player_id = players.id
    WHERE
    players.team_id = $1
    `, (request.body.team))
  .then(function(data) {
    console.log("BIG SELECTION: ",data);
    response.send(data);
  })
  .catch(function(error) {
    console.log(error.message);
  });
});

app.post('/add-defense-stats', function(request, response) {
  console.log(request.body);
  db.any(
    `INSERT INTO
    defense("G", "A", "PO", "E", player_id)
    VALUES
    (1, $(A), $(PO), $(E), $(id))
    ON CONFLICT
    (player_id)
    DO UPDATE SET
    "G" = coalesce(defense."G", 0) + EXCLUDED."G",
    "A" = coalesce(defense."A", 0) + EXCLUDED."A",
    "PO" = coalesce(defense."PO", 0) + EXCLUDED."PO",
    "E" = coalesce(defense."E", 0) + EXCLUDED."E"`, request.body)
  .then(function(data) {
    console.log(data);
    console.log("SSUUCCCCEESSSS");
  })
  .catch(function(error) {
    console.log("ERROR: ",error);
  });
});

app.post('/calc-defense-stats', function(request, response) {
  db.any(
    `SELECT
    *
    FROM
    defense
    LEFT OUTER JOIN
    players on defense.player_id = players.id
    WHERE
    players.team_id = $1
    `, (request.body.team))
  .then(function(data) {
    console.log("BIG SELECTION: ",data);
    response.send(data);
  })
  .catch(function(error) {
    console.log(error.message);
  });
});

app.post('/get-roster', function(request, response) {

  db.any(
    `SELECT
    *
    FROM
    batting
    LEFT OUTER JOIN
    players on batting.player_id = players.id
    WHERE
    team_id = $1`, request.body.team)
  .then(function(data) {
    // console.log(data);
    response.send(data);
  })
  .catch(function(error) {
    console.log(error.message);
  });
});

app.post('/confirm-team-details', function(request, response){
  db.any('SELECT id, team_name FROM teams ORDER BY id DESC LIMIT 1')
  .then(function(data) {
    console.log(data);
    response.send(data);
  })
  .catch(function(error) {
    console.log("ERROR: ", error.message);
  });
});

app.post('/add-new-team', function(request, response) {
  db.one('INSERT INTO teams(team_name, level, location, sport, statter_id) VALUES($1, $2, $3, $4, $5) RETURNING id, team_name', [request.body.name, request.body.level, request.body.location, request.body.sport, request.body.statter])
  .then(function(data) {
    response.send(data);
    console.log(data.id + '/////' + data.team_name);
  })
  .catch(function(error) {
    console.log("ERROR: ", error.message);
  });
});

app.post('/get-teams', function(request, response) {
  db.any('SELECT * FROM teams WHERE statter_id = $1', [request.body.statter])
    .then(function(data) {
      console.log(data);
      response.send(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.post('/add-new-player', function(request, response) {
  db.one('INSERT INTO players(player_name, age, number, team_id) VALUES($1, $2, $3, $4) RETURNING id, age, player_name, number', [request.body.name, request.body.age, request.body.number, request.body.team])
  .then(function(data) {
    console.log('Success');
    response.send(data);
    db.one('INSERT into batting(player_id) VALUES ($1)', data.id);
    db.one('INSERT into pitching(player_id) VALUES ($1)', data.id);
    db.one('INSERT into defense(player_id) VALUES ($1)', data.id);

  })
  .catch(function(error) {
    console.log("ADD PLAYER ERROR: ", error.message);
  });
});

app.listen(port, function() {
  console.log('listening on port ' + port + '.');
});
