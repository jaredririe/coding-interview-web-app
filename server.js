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

app.set('port', (process.env.PORT || 5000));
// start the server
var server = app.listen(app.get('port'), function() {
  console.log("Started on port " + app.get('port'));
  //var host = server.address().address;
  //var port = server.address().port;
  var host = server.address().address;
  var port = app.get('port');
});