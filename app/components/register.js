var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;
var auth = require("./auth.js");

// Register page, shows the registration form and redirects to the interviewdb if login is successful
var Register = React.createClass({
  // mixin for navigation
  mixins: [ History ],

  // initial state
  getInitialState: function() {
    return {
      // there was an error registering
      error: false
    };
  },

  // handle regiser button submit
  register: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var name = this.refs.name.value;
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    if (!name || !username || !password) {
      return;
    }
    // register via the API
    auth.register(name, username, password, function(loggedIn) {
      // register callback
      if (!loggedIn)
        return this.setState({
          error: true
        });
      this.history.pushState(null, "/");
    }.bind(this));
  },

  // show the registration form
  render: function() {
    return (
      <div>
        <h2>Register</h2>
        <form className="form-vertical col-md-8 col-sm-12" onSubmit={this.register}>
          <div className="form-group">
            <label>Name:</label>              
            <input className="form-control" type="text" placeholder="Name" ref="name" autoFocus={true} />
          </div>
          <div className="form-group">
            <label>User name:</label>              
            <input className="form-control" type="text" placeholder="Username" ref="username" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="form-control" type="password" placeholder="Password" ref="password"/>
          </div>

          <input className="btn btn-warning" type="submit" value="Register" />
          {this.state.error ? (
             <div className="alert">Invalid username or password.</div>
           ) : null }
        </form>
      </div>
    );
  }
});

module.exports = Register;
