var React = require('react');
var Task = require('./Task.js');

var TaskList = React.createClass({

	getInitialState: function () {
		return{
			data: [
				{"id":"00001","title":"Study some more","completed":false,"description":"", "priority":"low"},
				{"id":"00002","title":"Make some neat CSS","completed":false, "description":"","priority":"medium"},
				{"id":"00003","title":"Have some fun","completed":false, "description":"","priority":"high"}
			],
			color: "black",
			font: "Arial",
			completion: 0
		};
	},


	handleTaskSubmit: function (title) {

		var data = this.state.data;
		var id = this.generateID();
		var completed = false;
		var description = "";
		var priority = "low";

		data = data.concat([{id,title,completed,description,priority}]);

		this.setState({data});

		this.updateCompletion(data);

	},

	handleTaskRemoval: function(taskID) {

		var taskData = this.state.data;

		taskData = taskData.filter(function (element) {
			return element.id !== taskID;
		});

		this.setState({data: taskData});

		this.updateCompletion(taskData);

	},

	generateID: function () {

		return Date.now().toString();
	},

	updateCompletion: function(taskData){

		var completedTasks = 0.0;
		var taskCount = 0.0;

		taskData.map(function (taskItem) {

			if(taskItem.completed){

				completedTasks += 1;
			}
			taskCount += 1;
		}, this);

		var completionRate;

		if(taskCount == 0){

			completionRate = 0;
		}
		else{
			completionRate =  (completedTasks / taskCount) * 100;

		}

		this.setState({completion: completionRate});

	},

	handleTaskCompletion: function(taskID, taskIsCompleted) {

		this.state.data.map(function (taskItem) {

			if(taskItem.id == taskID){

				taskItem.completed = taskIsCompleted;
			}

		}, this);

		this.updateCompletion(this.state.data);

	},

	handleTaskDescUpdate: function(taskID, newDescription) {

		this.state.data.map(function (taskItem) {

			if(taskItem.id == taskID){

				taskItem.description = newDescription;
			}

		}, this);

		console.log("updated " + taskID);

		return;

	},

	sortTaskPriority: function() {

		var sortedTasks = this.getHighPriorityTasks();

		sortedTasks = sortedTasks.concat(this.getMedPriorityTasks(), this.getLowPriorityTasks());

		this.setState({data: sortedTasks});

		return;
	},

	getLowPriorityTasks: function() {

		var taskData = this.state.data;

		var lowTasks = taskData.filter(function (taskItem) {
			return taskItem.priority == "low";
		});

		return lowTasks;

	},

	getMedPriorityTasks: function(){

		var taskData = this.state.data;

		var medTasks = taskData.filter(function (taskItem) {
			return taskItem.priority == "medium";
		});

		return medTasks;

	},

	getHighPriorityTasks: function(){

		var taskData = this.state.data;

		var highTasks = taskData.filter(function (taskItem) {
			return taskItem.priority == "high";
		});

		return highTasks;

	},

	sortTaskName: function() {

	},

	render: function () {

		var listTasks = this.state.data.map(function (taskItem){

			return(
				<Task key={taskItem.id} taskID={taskItem.id} title={taskItem.title}
				completed={taskItem.completed} removeTask={this.handleTaskRemoval}
				font={this.props.font} updateCompletion = {this.handleTaskCompletion}
				updateDesc={this.handleTaskDescUpdate}
				/>

			);
		}, this);

		return(
			<ul className="myBox" onClick={this.handleClick}>
				<h1>This is a task list:</h1>
				<h1>Completion rate: {this.state.completion} %</h1>
				{listTasks}
				<TaskSubmitter onTaskSubmit={this.handleTaskSubmit}/>
				<button type="button" style={{backgroundColor: "gold"}} onClick={this.sortTaskPriority}>&#x2713;</button>
			</ul>

			);


	}

});

var TaskSubmitter = React.createClass({

	doSubmit: function (submitEvent) {

		submitEvent.preventDefault(); //Override default submit event

		var taskTitle = this.refs.task.value.trim();

		if(taskTitle == ""){

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
					<div className="ribbon round">
						<h3>Tell me what you must:</h3>
					</div>
					<input className="input-text" type="text" id="task" ref="task" placeholder="I have to..." />
					<div>
						<input type="submit" value="Save Task"/>
					</div>
				</form>
			</div>
		);
	}

});

module.exports = TaskList;