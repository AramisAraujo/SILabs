var React = require('react');
var Task = require('./Task.js');

var TaskList = React.createClass({

	getInitialState: function () {
		return{
			data: [
				{"id":"00001","title":"Study some more","completed":false},
				{"id":"00002","title":"Make some neat CSS","completed":false},
				{"id":"00003","title":"Have some fun","completed":false}
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

		data = data.concat([{id,title,completed}]);

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

	render: function () {

		var listTasks = this.state.data.map(function (taskItem){

			return(
				<Task key={taskItem.id} taskID={taskItem.id} title={taskItem.title}
				completed={taskItem.completed} removeTask={this.handleTaskRemoval}
				font={this.props.font} updateCompletion = {this.handleTaskCompletion}
				/>

			);
		}, this);

		return(
			<ul className="myBox" onClick={this.handleClick}>
				<h1>This is a task list:</h1>
				<h1>Completion rate: {this.state.completion} %</h1>
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
					<div>

						<input className="input-text" type="text" id="task" ref="task" placeholder="I have to..." />
					</div>

					<div>
						<input type="submit" value="Save Task"/>
					</div>

				</form>
			</div>
		);
	}

});

module.exports = TaskList;