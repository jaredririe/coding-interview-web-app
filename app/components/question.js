var React = require("react");
var Link = require('react-router').Link;
var answerList = require('./answerList.js');
var api = require("./api.js");
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

var AnswerQuestionBadge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" type="button" onClick={this.props.onClickEvent}>
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var options = {
  thumbnailData:  [{
    index: 0,
    header: "I see a crack in this wall...",
    description: 'What should I do?',
    timestamp: '1:57 PM, 11/19/15',
    username: 'Scrub57',
  },{
    index: 1,
    header: 'A boring question',
    description: 'Question Body',
    timestamp: 'time',
    username: 'username',
  }]
};

var Question = React.createClass({

  getInitialState: function() {
    return {
      loggedIn: auth.loggedIn(),
      displayForm: false
    };
  },
  //Handle answer question button
  handleClick: function(event){
    this.setState({displayForm: true});
  },
  //Add answer to database
  addAnswer: function(event){
    event.preventDefault();

    var body = this.refs.body.value;
    var questionID = this.props.params.questionID;
    api.addAnswer(body, questionID, this.reload);
  },

  reload: function(){

  },

  render: function() {
    return (
      <div>
        <div className = "col-xs-12">
          <h2>{options.thumbnailData[this.props.params.index].header}</h2>
        </div>
        <div className = "col-xs-12">
          <p>{options.thumbnailData[this.props.params.index].description}</p>
        </div>
        <p>
          {this.state.loggedIn ? (
             <AnswerQuestionBadge title="Answer Question" onClickEvent={this.handleClick}/>
           ) : (
            <Link to="login">
             <Badge title="Login to Answer!"/>
            </Link>
           )
          }         
        </p>
        <div>
          {this.state.displayForm ? (
            <div>
              <form className="form-vertical" onSubmit={this.addAnswer}>
                <input type="text" placeholder="Type your answer..." ref = "body" autoFocus={true} />
                <input className="btn btn-warning" type="submit" value="Submit" />
              </form>
            </div>
            ) : null
          }
        </div>
        <div>
          {answerList[this.props.params.index]}
        </div>
      </div>
    );
  }
});

module.exports = Question;