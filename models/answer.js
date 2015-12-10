// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

var User = require('./user.js');
var Question = require('./question.js');

// Item schema
var answerSchema = new Schema({
  user: {type: ObjectId, ref: 'users'},
  name: String,
  questionID: Number,//{type: ObjectId, ref: 'questions'},
  body: String,
  timestamp: {type: Date, default: Date.now},
  votes: {type: Number, default: 0}
});

// ensure schemas use virtual IDs
answerSchema.set('toJSON', {
  virtuals: true
});

// add findorCreate
answerSchema.plugin(findOrCreate);

// create item
var Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;
