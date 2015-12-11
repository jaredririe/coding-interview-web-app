var React = require("react");
var Answer = require("./answer.js");
var api = require("./api.js");

var AnswerList = React.createClass({

  render: function() {
    var sortedList = this.props.answers.sort(function(answer1, answer2){
      if(answer1.votes < answer2.votes){
        return 1;
      }
      if(answer1.votes > answer2.votes){
        return -1;
      }
      return 0;
    });
    var list = sortedList.map(function(answer){
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

module.exports = AnswerList;