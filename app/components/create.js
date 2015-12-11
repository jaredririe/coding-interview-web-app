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
    this.history.pushState(null, "/");
  },

  componentDidMount: function(){
    var editor = new wysihtml5.Editor('editor', {
      toolbar: 'toolbar',
      parserRules:  wysihtml5ParserRules
    });
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
              <div id="toolbar" style={{marginBottom: "10px"}}>
                <a title="Bold" className="btn btn-sm btn-primary toolbar-button" data-wysihtml5-command="bold"><i className="fa fa-bold"></i></a>
                <a title="Italic" className="btn btn-sm btn-primary toolbar-button" data-wysihtml5-command="italic"><i className="fa fa-italic"></i></a>
                <a title="Header" className="btn btn-sm btn-primary toolbar-button" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h3"><i className="fa fa-header"></i></a>
              </div>
              <textarea className="form-control" ref="body" id="editor"></textarea>
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
