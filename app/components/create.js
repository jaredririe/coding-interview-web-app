var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Link = require('react-router').Link
var History = ReactRouter.History;

var api = require("./api.js");
var auth = require("./auth.js");
  
// Login page, shows the login form and redirects to the interviewdb if login is successful
var Create = React.createClass({
  
  mixins : [History],
  
  getInitialState: function() {
    return {
      loggedIn: auth.loggedIn(),
    };
  },

  //Add answer to database
  addQuestion: function(event) {
    event.preventDefault();
    var header = this.refs.header.value;
    var body = this.refs.body.value;
    api.addQuestion(body, header, this.redirect);
  },

  redirect: function(){
    //Router.navigate("/");
    //this.transitionTo('/');
    this.history.pushState(null, "/");
  },
  
  // create question form
  render: function() {
    return (
        <div>
          <form className="form-vertical col-md-8 col-sm-12" role="form" onSubmit={this.addQuestion}>
            <h3>Ask a question!</h3>
            <div className="form-group">
              <label>Title:</label>
              <input className="form-control" type="text" ref="header" autoFocus={true} />
            </div>
            <div className="form-group">
              <label>Body:</label>
              <textarea rows="8" className="form-control" type="text" placeholder="Type your question..." ref="body" autoFocus={true}></textarea>
            </div>
            <div className="form-group">
              <input className="btn btn-warning" type="submit" value="Create Question" />
            </div>
          </form>
        </div>
    );
  }
});

module.exports = Create;
