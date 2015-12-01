var React = require("react");
var Link = require('react-router').Link

var Badge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" type="button">
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var Thumbnail = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12">
        <div className="thumbnail">
          <div className="caption">
            <h3>{this.props.header}</h3>
            <p>{this.props.description}</p>
            <div className = "row">
              <div className = "col-md-4">
                <p>
                  <Link to={`/question/${this.props.index}`}>
                    <Badge title="Answer Question"/>
                  </Link>
                </p>
              </div>
              <div className = "col-md-8">
              {this.props.username} - {this.props.timestamp}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ThumbnailList = React.createClass({
  render: function() {
    var list = this.props.thumbnailData.map(function(thumbnailProps){
      return (<Thumbnail {...thumbnailProps} />);
    });

    return (
      <div>
        {list}
      </div>
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

var questionList = React.createElement(ThumbnailList, options);

module.exports = questionList;