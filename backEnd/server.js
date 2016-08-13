var express = require('express');
var app = express();
var pgp = require('pg-promise')();
var bcrypt = require('my-bcrypt');
var bodyParser = require('body-parser');
var cors = require('cors');

var db = pgp('postgres://localhost:5432/baseball_db');


// db.one('insert into teams(team_name, level) values($1, $2) returning id', ['Yankees', 1])
//   .then(function(data) {
//     console.log(data);
//   })
//   .then(function(error) {
//     console.log(error);
//   });

app.post('/get-stats', function(request, response) {
  db.any('select team_name as name from teams')
    .then(function(data) {
      response.send(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(8000, function() {
  console.log('listening on port 8000');
});
