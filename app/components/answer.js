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

var Answer = React.createClass({
  render: function() {
        return (
      <div>
        <div className="thumbnail">
          <div className="caption">
            <div className = "row">
              <div className = "col-xs-6">
                <h4>{this.props.user}</h4>
              </div>
              <div className = "col-xs-2">
                <Badge title="-"/>
              </div>
              <div className="col-xs-2">
                {this.props.votes}
              </div>
              <div className = "col-xs-2">
                <Badge title="+"/>
              </div>
            </div>
            <p>{this.props.body}</p>
            <div>
              {this.props.timestamp}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Answer;