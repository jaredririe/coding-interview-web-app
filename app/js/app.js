var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
// var Home = require('./home.js');

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
                         data-target="#bs-example-navbar-collapse-1">
                   <span className="sr-only">Toggle navigation</span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/">Beginning</Link>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><Link to="page">Page</Link></li>
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

var Page = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Page</h1>
        <p>Demo another page here</p>
      </div>
    );
  }
});

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Home</h1>
        <p>Put your home page here</p>
        {element}
      </div>
    );
  }
});

////////////////////////////////////

var Badge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" type="button">
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var Thumbnail = React.createClass({
  render: function() {
    return (
      <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <div className="caption">
            <h3>{this.props.header}</h3>
            <p>{this.props.description}</p>
            <p>
              <Badge title={this.props.title} number={this.props.number} />
              {this.props.timestamp}-{this.props.username}
            </p>
          </div>
        </div>
      </div>
    );
  }
});

var ThumbnailList = React.createClass({
  render: function() {
    var list = this.props.thumbnailData.map(function(thumbnailProps){
      return (<Thumbnail {...thumbnailProps} />);
    });

    return (
      <div>
        {list}
      </div>
    );
  }
});

var options = {
  thumbnailData:  [{
    title: 'Answer Question',
    header: 'Question Title 1',
    description: 'Question Body',
    timestamp: 'time',
    username: 'username',
    // imageUrl: 'https://raw.githubusercontent.com/wiki/facebook/react/react-logo-1000-transparent.png'
  },{
    title: 'Answer Question',
    header: 'Question Title 1',
    description: 'Question Body',
    timestamp: 'time',
    username: 'username',
    // imageUrl: 'http://brunch.io/images/others/gulp.png'
  }]
};

var element = React.createElement(ThumbnailList, options);

//////////////////////////

// Run the routes
var routes = (
      <Router>
        <Route name="app" path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route name="page" path="/page" component={Page} />
        </Route>
      </Router>
);

ReactDOM.render(routes, document.body);