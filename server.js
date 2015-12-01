// setup Express
var app = require('./models/express.js');

// setup mongoose
var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost/list');

// models
//var api = require('./models/api.js');
//var User = require('./models/user.js');
//var Item = require('./models/item.js');

// start the server
var server = app.listen(process.env.PORT, function() {
  console.log("Started on port " + process.env.PORT);
  //var host = server.address().address;
  //var port = server.address().port;
  var host = process.env.IP;
  var port = process.env.PORT;
});