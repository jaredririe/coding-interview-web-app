var React = require("react");
var ReactRouter = require("react-router");
var Link = require('react-router').Link
var History = ReactRouter.History;

var api = require("./api.js");
var auth = require("./auth.js");
  
// Login page, shows the login form and redirects to the interviewdb if login is successful
var Create = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: auth.loggedIn(),
    };
  },

  //Add answer to database
  addQuestion: function(event){
    event.preventDefault();
    var header = this.refs.header.value;
    var body = this.refs.body.value;
    api.addQuestion(body, header, this.reload);
  },

  reload: function(){

  },
  
  // create question form
  render: function() {
    return (
        <div>
          <form className="form-vertical" onSubmit={this.addQuestion}>
            <input type="text" placeholder="Question Title" ref="header" autoFocus={true} />
            <input type="text" placeholder="Type your question..." ref="body" autoFocus={true} />
            <input className="btn btn-warning" type="submit" value="Submit" />
          </form>
        </div>
    );
  }
});

module.exports = Create;