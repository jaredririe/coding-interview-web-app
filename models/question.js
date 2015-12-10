// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

var User = require('./user.js');

// Item schema
var questionSchema = new Schema({
  user: {type: ObjectId, ref: 'users'},
  header: String,
  body: String,
  timestamp: {type: Date, default: Date.now},
});

// ensure schemas use virtual IDs
questionSchema.set('toJSON', {
  virtuals: true
});

// add findorCreate
questionSchema.plugin(findOrCreate);

// create item
var Question = mongoose.model('questions', questionSchema);

module.exports = Question;
