var React = require("react");
var Link = require('react-router').Link
var api = require('./api.js');
var auth = require('./auth.js');

var PlusBadge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary btn-sm" type="button" onClick={this.props.onPlusEvent}>
        <i className="fa fa-plus"></i>
      </button>
    );
  }
});

var MinusBadge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary btn-sm" type="button" onClick={this.props.onMinusEvent}>
        <i className="fa fa-minus"></i>
      </button>
    );
  }
});

var DeleteBadge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary btn-xs" type="button" onClick={this.props.onDeleteEvent}>
        <i className="fa fa-remove"></i>&nbsp;&nbsp;{this.props.title}
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
          <div className="caption" style={{display: "table", width: "100%"}}>
            <div className="col-xs-12" style={{display: "table-row"}}>
              <div className="col-xs-2 col-md-1" style={{display: "table-cell", textAlign: "center"}}>
                <PlusBadge title="+" onPlusEvent = {this.handlePlus}/>              
                <h4>{this.props.answer.votes}</h4>             
                <MinusBadge title="-" onMinusEvent = {this.handleMinus}/>
              </div>
              <p className="col-xs-10 col-md-11" style={{display: "table-cell"}} dangerouslySetInnerHTML={{__html: this.props.answer.body}}></p>
              <div className="col-xs-10 col-md-11">
                {this.props.answer.name} - {timeString}
                {(this.props.answer.name == auth.getName()) ? (
                  <div style={{float: "right"}}>
                    <DeleteBadge title="Delete Answer" onDeleteEvent={this.handleDelete}/>
                  </div>
                  ):null
                }
              </div>
            </div>            
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Answer;