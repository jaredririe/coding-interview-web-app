var app = require('./express.js');
var User = require('./user.js');
var Question = require('./question.js');
var Answer = require('./answer.js');

// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//
// API
//

// register a user
app.post('/api/users/register', function (req, res) {
  // find or create the user with the given username
  User.findOrCreate({username: req.body.username}, function(err, user, created) {
    if (created) {
      // if this username is not taken, then create a user record
      user.name = req.body.name;
      user.set_password(req.body.password);
      user.save(function(err) {
      	if (err) {
      	  res.sendStatus("403");
      	  return;
      	}
        // create a token
	      var token = User.generateToken(user.username);
	      
        // return value is JSON containing the user's name and token
        res.json({name: user.name, token: token});
      });
    } else {
      // return an error if the username is taken
      res.sendStatus("403");
    }
  });
});

// login a user
app.post('/api/users/login', function (req, res) {
  // find the user with the given username
  User.findOne({username: req.body.username}, function(err,user) {
    if (err) {
      res.sendStatus(403);
      return;
    }
    
    // validate the user exists and the password is correct
    if (user && user.checkPassword(req.body.password)) {
      // create a token
      var token = User.generateToken(user.username);
      
      // return value is JSON containing user's name and token
      res.json({name: user.name, token: token});
    } else {
      res.sendStatus(403);
    }
  });
});

// add a question
app.post('/api/questions', function (req,res) {
  // validate the supplied token
  // get indexes
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, create the item for the user
      Question.create(
        { user: user.id,
          header: req.body.question.header,
          body: req.body.question.body,
          name: user.name,
        }, function(err,item) {
            if (err) {
              res.sendStatus(403);
              return;
            }
            res.json({item:item});
        });
    } else {
      // token is not valid
      res.sendStatus(403);
    }
  });
});

// add an ansewr
app.post('/api/answers', function (req,res) {
  // validate the supplied token
  // get indexes
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, create the item for the user
      Answer.create({body:req.body.answer.body,user:user.id, name:user.name, questionID:req.body.answer.questionID }, function(err,item) {
      if (err) {
        res.sendStatus(403);
        return;
      }
      res.json({item:item});
      });
    } else {
      // token is not valid
      res.sendStatus(403);
    }
  });
});

// get answers based on question_id value
app.get('/api/answers/get/:question_id', function (req,res) {
  // No validation necessary
  Answer.find({questionID : req.params.question_id}, function(err, answers) {
  	if (err) {
  	  res.sendStatus(403);
  	  return;
  	}
      // return value is the answer as JSON
      res.json({answers:answers});
    });
});

// get all questions 
app.get("/api/question/get", function (req,res) {
  // No validation necessary
  Question.find(function(err, questions) {
  	if (err) {
  	  res.sendStatus(403);
  	  return;
  	}
      // return value is the answer as JSON
      res.json({questions:questions});
    });
});

// get question with given questionID 
app.get("/api/question/get/:question_id", function (req,res) {
  // No validation necessary
  Question.findById(req.params.question_id, function(err, question) {
  	if (err) {
  	  res.sendStatus(403); // TODO should this return 403?
  	  return;
  	}
    // return value is the question as JSON
    res.json({question: question});
    
    });
});

// update an answer
app.put('/api/answers/:answer_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, then find the requested answer
      Answer.findById(req.params.answer_id, function(err,answer) {
        if (err) {
          res.sendStatus(403);
          return;
        }
      answer.votes = req.body.answer.votes;
      answer.save(function(err) {
      if (err) {
        res.sendStatus(403);
        return;
      }
      // return value is the item as JSON
      res.json({answer: answer});
      });
    });
    } else {
      res.sendStatus(403);
    }
  });
});

// delete an answer
app.delete('/api/answers/:answer_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, then find the requested item
      Answer.findByIdAndRemove(req.params.answer_id, function(err,answer) {
    	if (err) {
    	  res.sendStatus(403);
    	  return;
    	}
      res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
});