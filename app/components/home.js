var React = require("react");
var Question = require("./question.js");
var api = require("./api.js");
var QuestionList = require("./questionList.js");
require('bootstrap');

var showTab = function(){
  $(this).tab('show');
};

var Home = React.createClass({
	getInitialState: function() {
		return {
			questions: []
		};
	},
	
	componentDidMount: function() {
		api.getQuestions(this.questionSet);
	},

  reload: function(){
    api.getQuestions(this.questionSet);
  },
	
	questionSet: function(status, data) {
		if (status) {
			this.setState({questions: data.questions});
		} 
	},
	
  render: function() {
    return (
			<div>
				<ul className="nav nav-tabs">
				  <li className="active"><a data-toggle="tab" href="#recent" onClick={showTab}>Most Recent</a></li>
				  <li><a data-toggle="tab" href="#popular" onClick={showTab}>Most Popular</a></li>
				  <li><a data-toggle="tab" href="#votes" onClick={showTab}>Most Votes</a></li>
				</ul>
			
				<div className="tab-content">
				  <div id="recent" className="tab-pane fade in active">
				    <h3 className="col-xs-12">Most recent questions</h3>
			        <QuestionList questions={this.state.questions} reload={this.reload}/>
				  </div>
				  <div id="popular" className="tab-pane fade">
				    <h3 className="col-xs-12">Most popular questions</h3>
			    	<QuestionList questions={this.state.questions} reload={this.reload}/>
				  </div>
				  <div id="votes" className="tab-pane fade">
				    <h3 className="col-xs-12">Most voted questions</h3>
				    <p className="col-xs-12">Feature to be implemented</p>
				  </div>
				</div>
			</div>
    );
  }
});

module.exports = Home;
