var React = require("react");
var Link = require('react-router').Link;
var AnswerList = require('./answerList.js');
var api = require("./api.js");
var auth = require("./auth.js");
var QuestionNode = require('./questionNode.js');

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

var Question = React.createClass({

  getInitialState: function() {
    return {
      loggedIn: auth.loggedIn(),
      displayForm: false,
      question : null, 
      answers : []
    };
  },
  
  // Handle answer question button
  showDiv: function(event){
    var editorDiv = $('#editorDiv');
    editorDiv.slideDown();

    $('.btn-warning', editorDiv).siblings('button').click(function(event){
      editorDiv.slideUp();
    });
  },
  
  // Add answer to database
  addAnswer: function(event){
    event.preventDefault();

    var body = this.refs.body.value;
    var questionID = this.props.params.question_id;
    api.addAnswer(body, questionID, this.reload);
    this.setState({displayForm: false});
  },

  componentWillMount: function() {
    api.getQuestion(this.props.params.question_id, function(status, data){
      if(status) {
        this.setState({question : data.question});
      }    
    }.bind(this));
    api.getAnswers(this.props.params.question_id, this.answerSet);
  },

  reload: function(){
    api.getAnswers(this.props.params.question_id, this.answerSet);
  },

  answerSet: function(status, data){
    if(status){
      this.setState({answers: data.answers});
    } else{
      this.context.router.transitionTo('login');
    }
  },

  render: function() {
    var divStyle = {
      display: 'none',
      border: '2px solid darkgray',
      padding: '10px',
      marginBottom: '20px'
    };

    return (
      <div>
        <div>
          {(this.state.question != null) ?(
            <QuestionNode key={this.props.params.question_id}
                          question={this.state.question}
                          showButton = {false}
                          reload={this.reload} />
            ) : null
          }
        </div>
        <p>
          {this.state.loggedIn ? (
             <AnswerQuestionBadge title="Answer Question" onClickEvent={this.showDiv}/>
           ) : (
            <Link to="login">
             <Badge title="Login to answer or vote!"/>
            </Link>
           )
          }         
        </p>
        <div id="editorDiv" style={divStyle}>
          <form className="form-vertical" onSubmit={this.addAnswer}>            
            <input className="form-control" type="text" ref="body" autoFocus={true} />            
            <input className="btn btn-warning" type="submit" value="Submit" />
            <button className="btn btn-default" type="reset">Cancel</button>
          </form>
        </div>
        <div>
          <AnswerList answers={this.state.answers} reload={this.reload}/>
        </div>
      </div>
    );
  }
});

module.exports = Question;