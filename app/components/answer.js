var React = require("react");
var Link = require('react-router').Link
var api = require('./api.js');
var auth = require('./auth.js');

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

var DeleteBadge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" type="button" onClick={this.props.onDeleteEvent}>
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

  handleDelete: function(event){
    api.deleteAnswer(this.props.answer, this.props.reload);
  },

  render: function() {
    var timestamp = new Date(this.props.answer.timestamp);
    var minutes = (timestamp.getMinutes() < 10) ? ("0" + timestamp.getMinutes()) : timestamp.getMinutes();
    var timeString = timestamp.getMonth() 
                    + "/" + timestamp.getDate() 
                    + "/" + timestamp.getFullYear() 
                    + " - "
                    + timestamp.getHours()
                    + ":" 
                    + minutes;

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
            <p>
              {(this.props.answer.name == auth.getName()) ? (
                <DeleteBadge title="Delete Answer" onDeleteEvent={this.handleDelete}/>
                ):null
              }
            </p>
            <p dangerouslySetInnerHTML={{__html: this.props.answer.body}}></p>
            <div>
              {timeString}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Answer;