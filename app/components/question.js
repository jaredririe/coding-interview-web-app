var React = require("react");
var Link = require('react-router').Link
var answerList = require('./answerList.js')

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
  render: function() {
    return (
      <div>
        <div>
        <h2>{options.thumbnailData[this.props.params.index].header}</h2>
        <p>{options.thumbnailData[this.props.params.index].description}</p>
        </div>
        {answerList[this.props.params.index]}
      </div>
    );
  }
});

module.exports = Question;