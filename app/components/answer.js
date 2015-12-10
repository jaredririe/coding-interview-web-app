var React = require("react");
var Link = require('react-router').Link
var api = require('./api.js');

var PlusBadge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" type="button" onClick={this.props.onPlusEvent}>
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var MinusBadge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" type="button" onClick={this.props.onMinusEvent}>
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var Answer = React.createClass({

  handlePlus: function(event){
    this.props.answer.votes = this.props.answer.votes + 1;
    api.updateAnswer(this.props.answer, this.props.reload);
  },

  handleMinus: function(event){
    this.props.answer.votes = this.props.answer.votes - 1;
    api.updateAnswer(this.props.answer, this.props.reload);
  },

  render: function() {
        return (
      <div>
        <div className="thumbnail">
          <div className="caption">
            <div className = "row">
              <div className = "col-xs-12 col-md-1">
                <PlusBadge title="+" onPlusEvent = {this.handlePlus}/>
              </div>
              <div className="col-xs-12 col-md-1">
                <h4>{this.props.answer.votes}</h4>
              </div>
              <div className = "col-xs-12 col-md-1">
                <MinusBadge title="-" onMinusEvent = {this.handleMinus}/>
              </div>
              <div className = "col-xs-12">
                <h4>{this.props.answer.name}</h4>
              </div>
            </div>
            <p>{this.props.answer.body}</p>
            <div>
              {this.props.answer.timestamp}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Answer;