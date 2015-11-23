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
                  <li><Link to="page">Profile</Link></li>
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

var Profile = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Profile</h1>
        <p>User Profile</p>
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
        {questionList}
      </div>
    );
  }
});

var Question = React.createClass({
  render: function() {
    return (
      <h1>Question {this.props.params.index}</h1>
    );
  }
});

var Answer = React.createClass({
  render: function() {
        return (
      <div className="col-xs-12">
        <div className="thumbnail">
          <div className="caption">
            <h3>{this.props.user}</h3>
            <p>{this.props.body}</p>
            <div className = "col-md-12">
              {this.props.timestamp}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var AnswerList = React.createClass({
  render: function() {
    var list = this.props.answerData.map(function(answerProps){
      return (<Thumbnail {...answerProps} />);
    });

    return (
      <div>
        {list}
      </div>
    );
  }
});

var tempAnswers1 = {
  answerData:  [{
    index: 0,
    user: 'Link',
    body: 'Throw a bomb at it',
    timestamp: 'time',
    votes : 9
  },{
    index: 1,
    user: 'Peppy',
    body: 'Do a barrel roll!',
    timestamp: 'time',
    votes: 70
  }]
};

var tempAnswers2 = {
  answerData:  [{
    index: 0,
    user: 'Bob',
    body: 'a boring answer',
    timestamp: 'time',
    votes : -3
  },{
    index: 1,
    user: 'Joe',
    body: 'An ever so slightly less boring answer',
    timestamp: 'time',
    votes: 15
  }]
};

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
      <div className="col-xs-12">
        <div className="thumbnail">
          <div className="caption">
            <h3>{this.props.header}</h3>
            <p>{this.props.description}</p>
            <div className = "row">
              <div className = "col-md-4">
                <p>
                  <Link to={`/question/${this.props.index}`}>
                    <Badge title="Answer Question"/>
                  </Link>
                </p>
              </div>
              <div className = "col-md-8">
              {this.props.username} - {this.props.timestamp}
              </div>
            </div>
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
    index: 1,
    header: "I see a crack in this wall...",
    description: 'What should I do?',
    timestamp: '1:57 PM, 11/19/15',
    username: 'Scrub57',
  },{
    index: 2,
    header: 'A boring question',
    description: 'Question Body',
    timestamp: 'time',
    username: 'username',
  }]
};

var questionList = React.createElement(ThumbnailList, options);

//////////////////////////

// Run the routes
var routes = (
      <Router>
        <Route name="app" path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route name="page" path="/page" component={Profile} />
          <Route name="question" path="/question/:index" component={Question} />
        </Route>
      </Router>
);

ReactDOM.render(routes, document.body);