var React = require("react");
var Answer = require("./answer.js");
var api = require("./api.js");


var AnswerList = React.createClass({

  render: function() {
    var list = this.props.answers.map(function(answer){
      return (
        <Answer key={answer.id} answer={answer} reload={this.props.reload} />
        );
    }.bind(this));

    return (
      <div>
        {list}
      </div>
    );
  }
});

// var answerData0 = {
//   answerData: [{
//     index: 0,
//     user: 'Link',
//     body: 'Throw a bomb at it',
//     timestamp: 'time',
//     votes : 70
//   },{
//     index: 1,
//     user: 'Peppy',
//     body: 'Do a barrel roll!',
//     timestamp: 'time',
//     votes: 9
//   }]
// };

// var answerData1 = {
//   answerData: [{
//     index: 0,
//     user: 'Joe',
//     body: 'An ever so slightly less boring answer',
//     timestamp: 'time',
//     votes: 15
//   },{
//     index: 1,
//     user: 'Bob',
//     body: 'a boring answer',
//     timestamp: 'time',
//     votes : -3
//   }]
// };

// var answerList = [];]
// answerList[0] = React.createElement(AnswerList, answerData0);
// answerList[1] = React.createElement(AnswerList, answerData1);

module.exports = AnswerList;