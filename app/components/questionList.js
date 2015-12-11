var React = require("react");
var Link = require('react-router').Link
var QuestionNode = require("./questionNode.js");

var QuestionList = React.createClass({

  render: function() {
    var sortedList = this.props.questions.sort(function(question1, question2){
      var date1 = new Date(question1.timestamp);
      var date2 = new Date(question2.timestamp);
      if(date1 < date2){
        return 1;
      }
      if(date1 > date2){
        return -1;
      }
      return 0;
    });
    var list = sortedList.map(function(question) {
      return (
        <QuestionNode key={question.id} question={question} showButton = {true} reload={this.props.reload} />
      );
    }.bind(this));

    return (
      <div>
        {list}
      </div>
    );
  }
});

module.exports = QuestionList;