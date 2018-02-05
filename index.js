var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.render('home.ejs');
});

app.get('/students/new', function (req, res) {
  res.render('createStudent.ejs');
});

app.post('/students/new', function (req, res) {
  // Push the new profile to the students array
  res.redirect('/students/0');
});

app.get('/students/:id', function (req, res) {
  res.render('viewStudent.ejs');
});

app.listen(3000, function () {
  console.log('Server started');
});