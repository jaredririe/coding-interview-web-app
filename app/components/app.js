var React = require("react");
var ReactRouter = require("react-router");
var Link = require('react-router').Link
var $ = require("jquery");

// Top-level component for the app
var App = React.createClass({
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
                <Link className="navbar-brand" to="/">Home</Link>
              </div>
              <div className="collapse navbar-collapse" id="navbar-collapse">
                <ul className="nav navbar-nav">
                  <li><Link to="profile">Profile</Link></li>
                </ul>
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