var React = require("react");
var Link = require('react-router').Link
var QuestionNode = require("./questionNode.js");

var QuestionList = React.createClass({

  render: function() {
    var list = this.props.questions.map(function(question) {
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