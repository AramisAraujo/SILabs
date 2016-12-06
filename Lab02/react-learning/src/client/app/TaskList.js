var React = require('react');
var Task = require('./Task.js');

var TaskList = React.createClass({

	toggleComplete: function (taskID) {
		this.props.toggleComplete(taskID);
		return;
	},

	removeTask: function (taskID) {

		this.props.removeTask(taskID);
		return;

	},	

	render: function () {

		var listTasks = this.props.data.map(function (taskItem){

			return(
				<Task key={taskItem.id} taskID={taskItem.id} title={taskItem.title}
				completed={taskItem.isComplete} removeTask={this.removeTask}
				toggleComplete={this.toggleComplete} />

			);
		}, this);

		return(
			<ul className="list-group">
				{listTasks}
			</ul>

			);


	}

});

module.exports = TaskList;