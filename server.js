// setup Express
var app = require('./models/express.js');

// setup mongoose
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/interviewdb');

// models
var api = require('./models/api.js');
var User = require('./models/user.js');
var Question = require('./models/question.js');
var Answer = require('./models/answer.js');

// start the server
var server = app.listen(3000, function() {
  console.log("Started on port " + 3000);
  //var host = server.address().address;
  //var port = server.address().port;
  var host = server.address().address;
  var port = 3000;
});