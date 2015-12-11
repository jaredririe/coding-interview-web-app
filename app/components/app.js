var React = require("react");
var ReactRouter = require("react-router");
var Link = require('react-router').Link
var $ = require("jquery");
var auth = require("./auth.js");

// Top-level component for the app
var App = React.createClass({
  // initial state
  getInitialState: function() {
    return {
      // the user is logged in
      loggedIn: auth.loggedIn()
    };
  },

  // callback when user is logged in
  setStateOnAuth: function(loggedIn) {
    this.setState({loggedIn:loggedIn});
  },

  // when the component loads, setup the callback
  componentWillMount: function() {
    auth.onChange = this.setStateOnAuth;
  },

  // logout the user and redirect to home page
  logout: function(event) {
    auth.logout();
    this.history.pushState(null, '/');
  },

  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
            <div className="navbar-header">
               <button type="button"
                       className="navbar-toggle"
                       data-toggle="collapse"
                       data-target=".navbar-collapse">
                 <span className="sr-only">Toggle navigation</span>
                 <span className="icon-bar"></span>
                 <span className="icon-bar"></span>
                 <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">the coding interview</a>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
              {this.state.loggedIn ? (
                <ul className="nav navbar-nav">
                  <li><a href="#" onClick={this.logout}>Logout</a></li>
                </ul>
              ) : (<div></div>)}
              
              {this.state.loggedIn ? (
                <ul className="nav navbar-nav">
                  <li><Link to="create">Ask Question</Link></li>
                </ul>
              ) : (<div></div>)}     
              
              {!this.state.loggedIn ? (
                <ul className="nav navbar-nav">
                  <li><Link to="login">Login</Link></li>
                </ul>
              ) : (<div></div>)}
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
