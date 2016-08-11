var express = require('express');
var app = express();
var pgp = require('pg-promise')();
var bcrypt = require('my-bcrypt');
var bodyParser = require('body-parser');
var cors = require('cors');

var db = pgp('postgres://localhost:5432/baseball_db');


app.listen(3000, function() {
  console.log('listening on port 3000');
});
