var React = require('react');
var Task = require('./Task.js');

var TaskList = React.createClass({

	getInitialState: function () {
		return{
			data: [
				{"id":"00001","title":"Study some more","completed":"false"},
				{"id":"00002","title":"Make some neat CSS","completed":"false"},
				{"id":"00003","title":"Have some fun","completed":"false"}
			],
			color: "black",
			font: "Arial"
		};
	},

	toggleComplete: function (taskID) {
		this.props.toggleComplete(taskID);
		return;
	},

	handleTaskSubmit: function (title) {

		var data = this.state.data;
		var id = this.generateID();
		var completed = "false";

		data = data.concat([{id,title,completed}]);

		this.setState({data});

	},

	handleTaskRemoval: function(taskID) {

		var data = this.state.data;

		data = data.filter(function (element) {
			return element.id !== taskID;
		});

		this.setState({data});

		return;

	},

	generateID: function () {

		return Date.now().toString();
	},

	render: function () {

		var listTasks = this.state.data.map(function (taskItem){

			return(
				<Task key={taskItem.id} taskID={taskItem.id} title={taskItem.title}
				completed={taskItem.isComplete} removeTask={this.handleTaskRemoval}
				font={this.props.font} 
				/>

			);
		}, this);

		return(
			<ul className="myBox" onClick={this.handleClick}>
				<h1>This is a task list:</h1>
				{listTasks}
				<TaskSubmitter onTaskSubmit={this.handleTaskSubmit}/>
			</ul>

			);


	}

});

var TaskSubmitter = React.createClass({

	doSubmit: function (submitEvent) {

		submitEvent.preventDefault(); //Override default submit event

		var taskTitle = this.refs.task.value.trim();

		if(task == ""){

			return;
		}

		this.props.onTaskSubmit(taskTitle);

		this.refs.task.value = "";

		return;

	},

	render: function() {
		return (
			<div className="myBox">			
				<form onSubmit={this.doSubmit}>
					<div>
						<label htmlFor="task">Tell me what you must:</label>
						<div>
							<input type="text" id="task" ref="task" placeholder="I have to..." />
						</div>
					</div>
					<div>
						<div>
							<input type="submit" value="Save Task"/>
						</div>
					</div>
				</form>
			</div>
		);
	}

});

module.exports = TaskList;