var React = require("react");
var Link = require('react-router').Link
var api = require('./api.js');

var Badge = React.createClass({
  render: function() {
    return (
      <button className="btn btn-primary" type="button">
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var QuestionNode = React.createClass({
  render: function() {
    var timestamp = new Date(this.props.question.timestamp);
    var minutes = (timestamp.getMinutes() < 10) ? ("0" + timestamp.getMinutes()) : timestamp.getMinutes();
    var timeString = this.props.question.name 
                    + " - " + timestamp.getMonth() 
                    + "/" + timestamp.getDate() 
                    + "/" + timestamp.getFullYear() 
                    + " - "
                    + timestamp.getHours()
                    + ":" 
                    + minutes;
    return (
      <div style={{display: "inline-block", width: "100%"}}>
        <div className="thumbnail">
          <div className="caption">
            <h3 style={{marginTop: "0"}}>{this.props.question.header}</h3>
            <p dangerouslySetInnerHTML={{__html: this.props.question.body}}></p>
            <div className = "row">
              <div className = "col-md-12 col-xs-6">
                {timeString}
              </div>
              {this.props.showButton 
                ? (<div style={{marginTop: "10px"}} className="col-md-12 col-xs-6">              
                    <span>
                      <Link to={`/question/${this.props.question.id}`}>
                        <Badge title="View Question"/>
                      </Link>
                    </span>
                  </div>)
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = QuestionNode;