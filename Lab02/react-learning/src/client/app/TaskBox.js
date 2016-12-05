var React = require('react');

var TaskBox = React.createClass({

	getInitialState: function () {

		return {
			tasks: []
			};
	},

	isValidTitle: function(title) {

		if(title == ""){
			return false;
		}

		return true;

	},

	addTask: function (submitEvent) {

		var taskList = this.state.tasks;
		var taskTitle = this._inputElement.value;

		if(this.isValidTitle(taskTitle)){//Check valid task title
			taskList.push({
				title: this._inputElement.value,
				key: Date.now(), //Defining unique key
			});
		}

		this.setState({
			tasks: taskList //Updating state
		});

		this._inputElement.value = ""; //Reset input value

		submitEvent.preventDefault(); //Overriding default submit event
	},



	render: function () {
		return(
			<form onSubmit={this.addTask}>

				<input type='text' name='taskName' 
				ref={(task) => this._inputElement = task}></input>

				<p></p>

				<input type='submit' value='Add Task'></input>

				<p></p>

				<TaskList entries={this.state.tasks}/>

			</form>
			);
	}
});

var TaskList = React.createClass({

	removeTask: function (task) {

	var taskList = this.state.tasks;

	var taskIndex = taskList.indexOf(task);

	taskList.splice(taskIndex, 1);

	this.setState({
		tasks: taskList
	});


	},

	render: function () {
		
		var taskListEntries = this.props.entries;

		function createTasks(task) {

			return (
				<div>
					<li key={task.key} >{task.title}</li>
					<button onClick={this.removeTask(task)}>X</button>
				</div>
				);
		}

		var listedTasks = taskListEntries.map(createTasks);

		return(
			<ul className="theTaskList">
				{listedTasks}
				</ul>
			);
	}
});

module.exports = TaskBox;

