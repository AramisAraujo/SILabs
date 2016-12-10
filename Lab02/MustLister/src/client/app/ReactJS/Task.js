var React = require('react');

var Task = React.createClass({

	getInitialState: function () {

		return ({color: this.props.color, title: this.props.title,
		font: this.props.font, taskID: this.props.ID })
	},

	removeTask: function(submitEvent) {

		submitEvent.preventDefault();//Override default submit event
		this.props.removeTask(this.props.taskID);
		return;
	},

	toggleComplete: function (toggleEvent) {

		toggleEvent.preventDefault();//Override default toggle event
		this.props.toggleComplete(this.props.taskID);
		return;		

	},

	componentWillReceiveProps: function(nextProps) {
   		if (nextProps != this.props) {
    		this.setState(nextProps);
    	}
  	},

	render: function () {

		var style = {color:this.state.color, fontFamily:this.state.font};

		if(this.state.completed == true){

			buttonColor = {backgroundColor: "red"};			
		}

		return(
			<li>

				<h1 style={style}>
					{this.props.title}
				</h1>

				<button type="button" style={{backgroundColor: "limegreen"}} className="btn btn-xs btn-success img-circle"
				 onClick={this.toggleComplete}>&#x2713;</button>

				<button type="button" style={{backgroundColor: "crimson"}} className="btn btn-xs btn-danger img-circle"
				 onClick={this.removeTask}>&#xff38;</button>
			</li>
				);}


});

module.exports = Task;