webpackJsonp([1],{

/***/ 0:
/*!****************************!*\
  !*** ./components/main.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var ReactDOM = __webpack_require__(/*! react-dom */ 158);
	var ReactRouter = __webpack_require__(/*! react-router */ 159);
	
	var Router = ReactRouter.Router;
	var Route = ReactRouter.Route;
	var IndexRoute = ReactRouter.IndexRoute;
	
	var $ = __webpack_require__(/*! jquery */ 226);
	
	var App = __webpack_require__(/*! ./app.js */ 210);
	var Question = __webpack_require__(/*! ./question.js */ 213);
	var Answer = __webpack_require__(/*! ./answer.js */ 214);
	var Home = __webpack_require__(/*! ./home.js */ 211);
	var Profile = __webpack_require__(/*! ./profile.js */ 212);
	
	__webpack_require__(/*! ../../~/bootstrap/dist/css/bootstrap.min.css */ 215);
	__webpack_require__(/*! ../css/app.css */ 224);
	
	// Run the routes
	var routes = React.createElement(
	    Router,
	    null,
	    React.createElement(
	        Route,
	        { name: "app", path: "/", component: App },
	        React.createElement(IndexRoute, { component: Home }),
	        React.createElement(Route, { name: "profile", path: "/profile", component: Profile }),
	        React.createElement(Route, { name: "question", path: "/question/:index", component: Question })
	    )
	);
	
	ReactDOM.render(routes, document.getElementById('content'));

/***/ },

/***/ 158:
/*!*******************************!*\
  !*** ../~/react-dom/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(/*! react/lib/ReactDOM */ 3);


/***/ },

/***/ 210:
/*!***************************!*\
  !*** ./components/app.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var ReactRouter = __webpack_require__(/*! react-router */ 159);
	var Link = __webpack_require__(/*! react-router */ 159).Link;
	var $ = __webpack_require__(/*! jquery */ 226);
	
	// Top-level component for the app
	var App = React.createClass({
	  displayName: "App",
	
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "nav",
	        { className: "navbar navbar-default", role: "navigation" },
	        React.createElement(
	          "div",
	          { className: "container" },
	          React.createElement(
	            "div",
	            { className: "navbar-header" },
	            React.createElement(
	              "button",
	              { type: "button",
	                className: "navbar-toggle",
	                "data-toggle": "collapse",
	                "data-target": ".navbar-collapse" },
	              React.createElement(
	                "span",
	                { className: "sr-only" },
	                "Toggle navigation"
	              ),
	              React.createElement("span", { className: "icon-bar" }),
	              React.createElement("span", { className: "icon-bar" }),
	              React.createElement("span", { className: "icon-bar" })
	            ),
	            React.createElement(
	              Link,
	              { className: "navbar-brand", to: "/" },
	              "Home"
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "collapse navbar-collapse", id: "navbar-collapse" },
	            React.createElement(
	              "ul",
	              { className: "nav navbar-nav" },
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  Link,
	                  { to: "profile" },
	                  "Profile"
	                )
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "container" },
	        this.props.children
	      )
	    );
	  }
	});
	
	module.exports = App;

/***/ },

/***/ 211:
/*!****************************!*\
  !*** ./components/home.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var Question = __webpack_require__(/*! ./question.js */ 213);
	var questionList = __webpack_require__(/*! ./questionList.js */ 228);
	
	var Home = React.createClass({
	  displayName: "Home",
	
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h1",
	        null,
	        "Home"
	      ),
	      questionList
	    );
	  }
	});
	
	module.exports = Home;

/***/ },

/***/ 212:
/*!*******************************!*\
  !*** ./components/profile.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	
	var Profile = React.createClass({
	  displayName: "Profile",
	
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h1",
	        null,
	        "Profile"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "User Profile"
	      )
	    );
	  }
	});
	
	module.exports = Profile;

/***/ },

/***/ 213:
/*!********************************!*\
  !*** ./components/question.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var Link = __webpack_require__(/*! react-router */ 159).Link;
	var answerList = __webpack_require__(/*! ./answerList.js */ 230);
	
	var options = {
	  thumbnailData: [{
	    index: 0,
	    header: "I see a crack in this wall...",
	    description: 'What should I do?',
	    timestamp: '1:57 PM, 11/19/15',
	    username: 'Scrub57'
	  }, {
	    index: 1,
	    header: 'A boring question',
	    description: 'Question Body',
	    timestamp: 'time',
	    username: 'username'
	  }]
	};
	
	var Question = React.createClass({
	  displayName: 'Question',
	
	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          options.thumbnailData[this.props.params.index].header
	        ),
	        React.createElement(
	          'p',
	          null,
	          options.thumbnailData[this.props.params.index].description
	        )
	      ),
	      answerList[this.props.params.index]
	    );
	  }
	});
	
	module.exports = Question;

/***/ },

/***/ 214:
/*!******************************!*\
  !*** ./components/answer.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var Link = __webpack_require__(/*! react-router */ 159).Link;
	
	var Answer = React.createClass({
	  displayName: "Answer",
	
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "div",
	        { className: "thumbnail" },
	        React.createElement(
	          "div",
	          { className: "caption" },
	          React.createElement(
	            "div",
	            { className: "row" },
	            React.createElement(
	              "div",
	              { className: "col-xs-6" },
	              React.createElement(
	                "h4",
	                null,
	                this.props.user
	              )
	            ),
	            React.createElement(
	              "div",
	              { className: "col-xs-2" },
	              React.createElement(Badge, { title: "-" })
	            ),
	            React.createElement(
	              "div",
	              { className: "col-xs-2" },
	              this.props.votes
	            ),
	            React.createElement(
	              "div",
	              { className: "col-xs-2" },
	              React.createElement(Badge, { title: "+" })
	            )
	          ),
	          React.createElement(
	            "p",
	            null,
	            this.props.body
	          ),
	          React.createElement(
	            "div",
	            null,
	            this.props.timestamp
	          )
	        )
	      )
	    );
	  }
	});
	
	module.exports = Answer;

/***/ },

/***/ 215:
/*!*************************************************!*\
  !*** ../~/bootstrap/dist/css/bootstrap.min.css ***!
  \*************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 224:
/*!*********************!*\
  !*** ./css/app.css ***!
  \*********************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 228:
/*!************************************!*\
  !*** ./components/questionList.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var Link = __webpack_require__(/*! react-router */ 159).Link;
	
	var Badge = React.createClass({
	  displayName: "Badge",
	
	  render: function () {
	    return React.createElement(
	      "button",
	      { className: "btn btn-primary", type: "button" },
	      this.props.title,
	      " ",
	      React.createElement(
	        "span",
	        { className: "badge" },
	        this.props.number
	      )
	    );
	  }
	});
	
	var Thumbnail = React.createClass({
	  displayName: "Thumbnail",
	
	  render: function () {
	    return React.createElement(
	      "div",
	      { className: "col-xs-12" },
	      React.createElement(
	        "div",
	        { className: "thumbnail" },
	        React.createElement(
	          "div",
	          { className: "caption" },
	          React.createElement(
	            "h3",
	            null,
	            this.props.header
	          ),
	          React.createElement(
	            "p",
	            null,
	            this.props.description
	          ),
	          React.createElement(
	            "div",
	            { className: "row" },
	            React.createElement(
	              "div",
	              { className: "col-md-4" },
	              React.createElement(
	                "p",
	                null,
	                React.createElement(
	                  Link,
	                  { to: `/question/${ this.props.index }` },
	                  React.createElement(Badge, { title: "Answer Question" })
	                )
	              )
	            ),
	            React.createElement(
	              "div",
	              { className: "col-md-8" },
	              this.props.username,
	              " - ",
	              this.props.timestamp
	            )
	          )
	        )
	      )
	    );
	  }
	});
	
	var ThumbnailList = React.createClass({
	  displayName: "ThumbnailList",
	
	  render: function () {
	    var list = this.props.thumbnailData.map(function (thumbnailProps) {
	      return React.createElement(Thumbnail, thumbnailProps);
	    });
	
	    return React.createElement(
	      "div",
	      null,
	      list
	    );
	  }
	});
	
	var options = {
	  thumbnailData: [{
	    index: 0,
	    header: "I see a crack in this wall...",
	    description: 'What should I do?',
	    timestamp: '1:57 PM, 11/19/15',
	    username: 'Scrub57'
	  }, {
	    index: 1,
	    header: 'A boring question',
	    description: 'Question Body',
	    timestamp: 'time',
	    username: 'username'
	  }]
	};
	
	var questionList = React.createElement(ThumbnailList, options);
	
	module.exports = questionList;

/***/ },

/***/ 230:
/*!**********************************!*\
  !*** ./components/answerList.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(/*! react */ 1);
	var Link = __webpack_require__(/*! react-router */ 159).Link;
	
	var AnswerList = React.createClass({
	  displayName: 'AnswerList',
	
	  render: function () {
	    var list = this.props.answerData.map(function (answerProps) {
	      return React.createElement(Answer, answerProps);
	    });
	
	    return React.createElement(
	      'div',
	      null,
	      list
	    );
	  }
	});
	
	var answerData0 = {
	  answerData: [{
	    index: 0,
	    user: 'Link',
	    body: 'Throw a bomb at it',
	    timestamp: 'time',
	    votes: 70
	  }, {
	    index: 1,
	    user: 'Peppy',
	    body: 'Do a barrel roll!',
	    timestamp: 'time',
	    votes: 9
	  }]
	};
	
	var answerData1 = {
	  answerData: [{
	    index: 0,
	    user: 'Joe',
	    body: 'An ever so slightly less boring answer',
	    timestamp: 'time',
	    votes: 15
	  }, {
	    index: 1,
	    user: 'Bob',
	    body: 'a boring answer',
	    timestamp: 'time',
	    votes: -3
	  }]
	};
	
	var answerList = [];
	answerList[0] = React.createElement(AnswerList, answerData0);
	answerList[1] = React.createElement(AnswerList, answerData1);
	
	module.exports = AnswerList;

/***/ }

});
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map