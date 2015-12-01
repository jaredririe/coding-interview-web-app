var React = require("react");
var ReactDOM = require('react-dom');
var ReactRouter = require("react-router");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var $ = require("jquery");

var App = require("./app.js");
var Question = require("./question.js");
var Answer = require("./answer.js");
var Home = require("./home.js");
var Profile = require("./profile.js");

require("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../css/app.css");

// Run the routes
var routes = (
    <Router>
    <Route name="app" path="/" component={App}>
        <IndexRoute component={Home} />
        <Route name="profile" path="/profile" component={Profile} />
        <Route name="question" path="/question/:index" component={Question} />
    </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
