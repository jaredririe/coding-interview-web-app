webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(158);
	var ReactRouter = __webpack_require__(159);

	var Router = ReactRouter.Router;
	var Route = ReactRouter.Route;
	var IndexRoute = ReactRouter.IndexRoute;

	var $ = __webpack_require__(208);

	var App = __webpack_require__(209);
	var Question = __webpack_require__(211);
	var Answer = __webpack_require__(213);
	var Home = __webpack_require__(215);
	var Login = __webpack_require__(217);
	var Register = __webpack_require__(218);

	__webpack_require__(219);
	__webpack_require__(228);

	// Run the routes
	var routes = React.createElement(
	    Router,
	    null,
	    React.createElement(
	        Route,
	        { name: "app", path: "/", component: App },
	        React.createElement(IndexRoute, { component: Home }),
	        React.createElement(Route, { name: "login", path: "/login", component: Login }),
	        React.createElement(Route, { name: "register", path: "/register", component: Register }),
	        React.createElement(Route, { name: "question", path: "/question/:index", component: Question })
	    )
	);

	ReactDOM.render(routes, document.getElementById('content'));

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(3);


/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);
	var Link = __webpack_require__(159).Link;
	var $ = __webpack_require__(208);

	var auth = __webpack_require__(210);

	// Top-level component for the app
	var App = React.createClass({
	  displayName: "App",

	  // initial state
	  getInitialState: function () {
	    return {
	      // the user is logged in
	      loggedIn: auth.loggedIn()
	    };
	  },

	  // callback when user is logged in
	  setStateOnAuth: function (loggedIn) {
	    this.setState({ loggedIn: loggedIn });
	  },

	  // when the component loads, setup the callback
	  componentWillMount: function () {
	    auth.onChange = this.setStateOnAuth;
	  },

	  // logout the user and redirect to home page
	  logout: function (event) {
	    auth.logout();
	    this.history.pushState(null, '/');
	  },

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
	            this.state.loggedIn ? React.createElement(
	              "ul",
	              { className: "nav navbar-nav" },
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { href: "#", onClick: this.logout },
	                  "Logout"
	                )
	              )
	            ) : React.createElement("div", null),
	            !this.state.loggedIn ? React.createElement(
	              "ul",
	              { className: "nav navbar-nav" },
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  Link,
	                  { to: "login" },
	                  "Login"
	                )
	              )
	            ) : React.createElement("div", null)
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

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(208);

	// authentication object
	var auth = {
	  register: function (name, username, password, cb) {
	    // submit request to server, call the callback when complete
	    var url = "/api/users/register";
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'POST',
	      data: {
	        name: name,
	        username: username,
	        password: password
	      },
	      // on success, store a login token
	      success: (function (res) {
	        localStorage.token = res.token;
	        localStorage.name = res.name;
	        this.onChange(true);
	        if (cb) cb(true);
	      }).bind(this),
	      error: (function (xhr, status, err) {
	        // if there is an error, remove any login token
	        delete localStorage.token;
	        this.onChange(false);
	        if (cb) cb(false);
	      }).bind(this)
	    });
	  },
	  // login the user
	  login: function (username, password, cb) {
	    // submit login request to server, call callback when complete
	    cb = arguments[arguments.length - 1];
	    // check if token in local storage
	    if (localStorage.token) {
	      this.onChange(true);
	      if (cb) cb(true);
	      return;
	    }

	    // submit request to server
	    var url = "/api/users/login";
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'POST',
	      data: {
	        username: username,
	        password: password
	      },
	      success: (function (res) {
	        // on success, store a login token
	        localStorage.token = res.token;
	        localStorage.name = res.name;
	        this.onChange(true);
	        if (cb) cb(true);
	      }).bind(this),
	      error: (function (xhr, status, err) {
	        // if there is an error, remove any login token
	        delete localStorage.token;
	        this.onChange(false);
	        if (cb) cb(false);
	      }).bind(this)
	    });
	  },
	  // get the token from local storage
	  getToken: function () {
	    return localStorage.token;
	  },
	  // get the name from local storage
	  getName: function () {
	    return localStorage.name;
	  },
	  // logout the user, call the callback when complete
	  logout: function (cb) {
	    delete localStorage.token;
	    this.onChange(false);
	    if (cb) cb();
	  },
	  // check if user is logged in
	  loggedIn: function () {
	    return !!localStorage.token;
	  },
	  // default onChange function
	  onChange: function () {}
	};

	module.exports = auth;

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Link = __webpack_require__(159).Link;
	var answerList = __webpack_require__(212);
	var api = __webpack_require__(214);
	var auth = __webpack_require__(210);

	var Badge = React.createClass({
	  displayName: 'Badge',

	  render: function () {
	    return React.createElement(
	      'button',
	      { className: 'btn btn-primary', type: 'button' },
	      this.props.title,
	      ' ',
	      React.createElement(
	        'span',
	        { className: 'badge' },
	        this.props.number
	      )
	    );
	  }
	});

	var AnswerQuestionBadge = React.createClass({
	  displayName: 'AnswerQuestionBadge',

	  render: function () {
	    return React.createElement(
	      'button',
	      { className: 'btn btn-primary', type: 'button', onClick: this.props.onClickEvent },
	      this.props.title,
	      ' ',
	      React.createElement(
	        'span',
	        { className: 'badge' },
	        this.props.number
	      )
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

	var Question = React.createClass({
	  displayName: 'Question',

	  getInitialState: function () {
	    return {
	      loggedIn: auth.loggedIn(),
	      displayForm: false
	    };
	  },
	  //Handle answer question button
	  handleClick: function (event) {
	    this.setState({ displayForm: true });
	  },
	  //Add answer to database
	  addAnswer: function (event) {
	    event.preventDefault();

	    var body = this.refs.body.value;
	    var questionID = this.props.params.questionID;
	    api.addAnswer(body, questionID, this.reload);
	  },

	  reload: function () {},

	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'col-xs-12' },
	        React.createElement(
	          'h2',
	          null,
	          options.thumbnailData[this.props.params.index].header
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'col-xs-12' },
	        React.createElement(
	          'p',
	          null,
	          options.thumbnailData[this.props.params.index].description
	        )
	      ),
	      React.createElement(
	        'p',
	        null,
	        this.state.loggedIn ? React.createElement(AnswerQuestionBadge, { title: 'Answer Question', onClickEvent: this.handleClick }) : React.createElement(
	          Link,
	          { to: 'login' },
	          React.createElement(Badge, { title: 'Login to Answer!' })
	        )
	      ),
	      React.createElement(
	        'div',
	        null,
	        this.state.displayForm ? React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'form',
	            { className: 'form-vertical', onSubmit: this.addAnswer },
	            React.createElement('input', { type: 'text', placeholder: 'Type your answer...', ref: 'body', autoFocus: true }),
	            React.createElement('input', { className: 'btn btn-warning', type: 'submit', value: 'Submit' })
	          )
	        ) : null
	      ),
	      React.createElement(
	        'div',
	        null,
	        answerList[this.props.params.index]
	      )
	    );
	  }
	});

	module.exports = Question;

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Answer = __webpack_require__(213);

	var AnswerList = React.createClass({
	  displayName: "AnswerList",

	  render: function () {
	    var list = this.props.answerData.map(function (answerProps) {
	      return React.createElement(Answer, answerProps);
	    });

	    return React.createElement(
	      "div",
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

	module.exports = answerList;

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Link = __webpack_require__(159).Link;

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
	              { className: "col-xs-12 col-md-1" },
	              React.createElement(Badge, { title: "+" })
	            ),
	            React.createElement(
	              "div",
	              { className: "col-xs-12 col-md-1" },
	              React.createElement(
	                "h4",
	                null,
	                this.props.votes
	              )
	            ),
	            React.createElement(
	              "div",
	              { className: "col-xs-12 col-md-1" },
	              React.createElement(Badge, { title: "-" })
	            ),
	            React.createElement(
	              "div",
	              { className: "col-xs-12" },
	              React.createElement(
	                "h4",
	                null,
	                this.props.user
	              )
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

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(208);

	// API object
	var api = {
	  // get the list of answers, call the callback when complete
	  getAnswers: function (cb) {
	    var url = "/api/answers";
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'GET',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is an error, remove the login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  },
	  // add an item, call the callback when complete
	  addAnswer: function (body, questionID, cb) {
	    var url = "/api/answers";
	    $.ajax({
	      url: url,
	      contentType: 'application/json',
	      data: JSON.stringify({
	        answer: {
	          'body': body,
	          'questionID': questionID
	        }
	      }),
	      type: 'POST',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is an error, remove the login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  },
	  // update an answer, call the callback when complete
	  updateAnswer: function (answer, cb) {
	    var url = "/api/answers/" + answer.id;
	    $.ajax({
	      url: url,
	      contentType: 'application/json',
	      data: JSON.stringify({
	        answer: {
	          body: answer.body,
	          votes: item.votes
	        }
	      }),
	      type: 'PUT',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is any error, remove any login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  },

	  // delete an answer, call the callback when complete
	  deleteAnswer: function (item, cb) {
	    var url = "/api/answers/" + answer.id;
	    $.ajax({
	      url: url,
	      type: 'DELETE',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is an error, remove any login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  }

	};

	module.exports = api;

/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Question = __webpack_require__(211);
	var questionList = __webpack_require__(216);

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

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Link = __webpack_require__(159).Link;

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

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);
	var Link = __webpack_require__(159).Link;
	var History = ReactRouter.History;

	var auth = __webpack_require__(210);

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

	// Login page, shows the login form and redirects to the interviewdb if login is successful
	var Login = React.createClass({
	  displayName: "Login",

	  // mixin for navigation
	  mixins: [History],

	  // initial state
	  getInitialState: function () {
	    return {
	      // there was an error on logging in
	      error: false
	    };
	  },

	  // handle login button submit
	  login: function (event) {
	    // prevent default browser submit
	    event.preventDefault();
	    // get data from form
	    var username = this.refs.username.value;
	    var password = this.refs.password.value;
	    if (!username || !password) {
	      return;
	    }
	    // login via API
	    auth.login(username, password, (function (loggedIn) {
	      // login callback
	      if (!loggedIn) return this.setState({
	        error: true
	      });
	      this.history.pushState(null, '/interviewdb');
	      return this.setState({ error: false });
	    }).bind(this));
	  },

	  // show the login form
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "div",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Login"
	        ),
	        React.createElement(
	          "form",
	          { className: "form-vertical", onSubmit: this.login },
	          React.createElement("input", { type: "text", placeholder: "Username", ref: "username", autoFocus: true }),
	          React.createElement("input", { type: "password", placeholder: "Password", ref: "password" }),
	          React.createElement("input", { className: "btn btn-warning", type: "submit", value: "Login" }),
	          this.state.error ? React.createElement(
	            "div",
	            { className: "alert" },
	            "Invalid username or password."
	          ) : null,
	          auth.loggedIn() ? React.createElement(
	            "div",
	            { className: "alert" },
	            "Success!"
	          ) : null
	        )
	      ),
	      React.createElement(
	        "div",
	        null,
	        React.createElement(
	          "p",
	          null,
	          React.createElement(
	            Link,
	            { to: "/register" },
	            React.createElement(Badge, { title: "Register" })
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Login;

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);
	var History = ReactRouter.History;

	var auth = __webpack_require__(210);

	// Register page, shows the registration form and redirects to the interviewdb if login is successful
	var Register = React.createClass({
	  displayName: "Register",

	  // mixin for navigation
	  mixins: [History],

	  // initial state
	  getInitialState: function () {
	    return {
	      // there was an error registering
	      error: false
	    };
	  },

	  // handle regiser button submit
	  register: function (event) {
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
	    auth.register(name, username, password, (function (loggedIn) {
	      // register callback
	      if (!loggedIn) return this.setState({
	        error: true
	      });
	      this.history.pushState(null, '/interviewdb');
	    }).bind(this));
	  },

	  // show the registration form
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h2",
	        null,
	        "Register"
	      ),
	      React.createElement(
	        "form",
	        { className: "form-vertical", onSubmit: this.register },
	        React.createElement("input", { type: "text", placeholder: "Name", ref: "name", autoFocus: true }),
	        React.createElement("input", { type: "text", placeholder: "Username", ref: "username" }),
	        React.createElement("input", { type: "password", placeholder: "Password", ref: "password" }),
	        React.createElement("input", { className: "btn", type: "submit", value: "Register" }),
	        this.state.error ? React.createElement(
	          "div",
	          { className: "alert" },
	          "Invalid username or password."
	        ) : null
	      )
	    );
	  }
	});

	module.exports = Register;

/***/ },

/***/ 219:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 228:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});