var React = require("react");
var Link = require('react-router').Link

var AnswerList = React.createClass({
  render: function() {
    var list = this.props.answerData.map(function(answerProps){
      return (<Answer {...answerProps} />);
    });

    return (
      <div>
        {list}
      </div>
    );
  }
});

var answerData0 = {
  answerData: [{
    index: 0,
    user: 'Link',
    body: 'Throw a bomb at it',
    timestamp: 'time',
    votes : 70
  },{
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
  },{
    index: 1,
    user: 'Bob',
    body: 'a boring answer',
    timestamp: 'time',
    votes : -3
  }]
};

var answerList = [];
answerList[0] = React.createElement(AnswerList, answerData0);
answerList[1] = React.createElement(AnswerList, answerData1);

module.exports = AnswerList;