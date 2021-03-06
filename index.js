var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });

app.use(express.static("public"));

var idCounter = 0;
var students = [];

app.get('/', function (req, res) {
  res.render('home.ejs');
});

app.get('/students/new', function (req, res) {
  res.render('createStudent.ejs');
});

app.post('/students/new', upload.single('photo_url'), function (req, res) {

  var first_name = req.body.first_name;
  var biography = req.body.biography;
  var city = req.body.city;

  var photo_url = req.file.filename; // uploads/493b27cc2bb406686c4dd3e4dbd90b7d

  var newStudent = {
    id: idCounter,
    first_name: first_name,
    biography: biography,
    city: city,
    photo_url: photo_url,
  };

  idCounter++;

  students.push(newStudent);

  // Push the new profile to the students array
  res.redirect('/students/' + newStudent.id);
});

app.get('/students/:id', function (req, res) {

  var id = parseInt(req.params.id);

  for (var i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      return res.render('viewStudent.ejs', {
        id: students[i].id,
        first_name: students[i].first_name,
        biography: students[i].biography,
        city: students[i].city,
        photo_url: students[i].photo_url,
      });
    }
  }
  return res.status(404).send('Not found');
});

app.listen(3000, function () {
  console.log('Server started');
});