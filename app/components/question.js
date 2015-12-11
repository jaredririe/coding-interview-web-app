var React = require("react");
var Link = require('react-router').Link;
var AnswerList = require('./answerList.js');
var api = require("./api.js");
var auth = require("./auth.js");

var Badge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" type="button" bsSize="small">
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var AnswerQuestionBadge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" type="button" bsSize="small" onClick={this.props.onClickEvent}>
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var options = {
  thumbnailData:  [{
    question_id: 0,
    header: "I see a crack in this wall...",
    description: 'What should I do?',
    timestamp: '1:57 PM, 11/19/15',
    username: 'Scrub57',
  },{
    question_id: 1,
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
      displayForm: false,
      question : null,
      answers : []
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
    var questionID = this.props.params.question_id;
    api.addAnswer(body, questionID, this.reload);
    this.setState({displayForm: false});
  },

  componentDidMount: function(){
    // api.getQuestion(this.questionSet);
    api.getAnswers(this.props.params.question_id, this.answerSet);
  },

  reload: function(){
    api.getAnswers(this.props.params.question_id, this.answerSet);
  },

  questionSet: function(status, data){
    if(status){
      this.setState({question : data.question});
    }
    else{
      this.context.router.transitionTo('login');
    }
  },

  answerSet: function(status, data){
    if(status){
      this.setState({answers: data.answers});
    }
    else{
      this.context.router.transitionTo('login');
    }
  },

  render: function() {
    return (
      <div>
        <div className = "col-xs-12">
          <h2>{options.thumbnailData[this.props.params.question_id].header}</h2>
        </div>
        <div className = "col-xs-12">
          <p>{options.thumbnailData[this.props.params.question_id].description}</p>
        </div>
        <p>
          {this.state.loggedIn ? (
             <AnswerQuestionBadge title="Answer Question" onClickEvent={this.handleClick}/>
           ) : (
            <Link to="login">
             <Badge title="Login to answer or vote!"/>
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
          <AnswerList answers={this.state.answers} reload={this.reload}/>
        </div>
      </div>
    );
  }
});

module.exports = Question;