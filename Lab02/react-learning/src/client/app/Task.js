var React = require('react');

var Task = React.createClass({

	getInitialState: function () {

		return ({ color: "white", title: this.props.title, taskID: this.props.ID })
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

	render: function () {

		var bgColor = {backgroundColor: this.state.color};

		return(
			<div>
				<h1>
					{this.props.title}
				</h1>

				<button type="button" className="btn btn-xs btn-success img-circle"
				 onClick={this.toggleComplete}>&#x2713;</button>

				<button type="button" className="btn btn-xs btn-danger img-circle"
				 onClick={this.removeTask}>&#xff38;</button>
			</div>
				);}


});

module.exports = Task;