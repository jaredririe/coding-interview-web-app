var React = require("react");
var ReactRouter = require("react-router");
var Link = require('react-router').Link
var History = ReactRouter.History;

var auth = require("./auth.js");

var Badge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" type="button">
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

// Login page, shows the login form and redirects to the interviewdb if login is successful
var Login = React.createClass({
  // mixin for navigation
  mixins: [ History ],

  // initial state
  getInitialState: function() {
    return {
      // there was an error on logging in
      error: false
    };

  },

  // handle login button submit
  login: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    if (!username || !password) {
      return;
    }
    // login via API
    auth.login(username, password, function(loggedIn) {
      // login callback
      if (!loggedIn)
        return this.setState({
          error: true
        });
      this.history.pushState(null, "/");
      return this.setState({error: false});
    }.bind(this));
  },

  // show the login form
  render: function() {
    var divStyle = {
      color: 'black',
      margin: '0 10px 0 0'
    };

    return (
      <div>
        <form className="form-vertical col-md-8 col-sm-12" onSubmit={this.login}>
          <h3>Login or register!</h3>
          <div className="form-group">
            <label>User name:</label>              
            <input className="form-control" type="text" placeholder="Username" ref="username" autoFocus={true} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="form-control" type="password" placeholder="Password" ref="password"/>
          </div>
          <div className="form-group">
            <input className="btn btn-warning" type="submit" value="Login" style={divStyle} />
            <Link to="/register"><Badge title="Register"/></Link>
          </div>
          {this.state.error ? (
             <div className="alert">Invalid username or password.</div>
           ) : null
          }
          {auth.loggedIn() ? (
            <div className="alert">Success!</div>
            ) : null
          }
        </form>
      </div>
    );
  }
});

module.exports = Login;
