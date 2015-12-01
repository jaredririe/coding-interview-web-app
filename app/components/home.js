var React = require("react");
var Question = require("./question.js");
var questionList = require("./questionList.js")

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Home</h1>
        {questionList}
      </div>
    );
  }
});

module.exports = Home;