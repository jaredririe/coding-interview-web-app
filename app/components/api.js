var $ = require("jquery");

// API object
var api = {
  // get the list of answers, call the callback when complete
  getAnswers: function(question_id, cb) {
    var url = "/api/answers/get/" + question_id;
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  },
  
  // add an item, call the callback when complete
  addQuestion: function(body, header, cb) {
    var url = "/api/questions";
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        question:{ 
          'header': header,
          'body': body,
        }
      }),
      type: 'POST',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  },
  
  // add an item, call the callback when complete
  addAnswer: function(body, questionID, cb) {
    var url = "/api/answers";
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        answer: {
          'body': body,
          'questionID': questionID,
        }
      }),
      type: 'POST',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });

  },
  
  // update an answer, call the callback when complete
  updateAnswer: function(answer, cb) {
    var url = "/api/answers/" + answer.id;
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        answer: {
          body: answer.body,
          votes: answer.votes
        }
      }),
      type: 'PUT',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is any error, remove any login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  },

  // delete an answer, call the callback when complete
  deleteAnswer: function(item, cb) {
    var url = "/api/answers/" + answer.id;
    $.ajax({
      url: url,
      type: 'DELETE',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove any login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  }

};

module.exports = api;
