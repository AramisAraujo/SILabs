var React = require('react');
var Task = require('./Task.js');

var TaskList = React.createClass({

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

		var newTask = new Task();

		newTask.setState({title : this.props.taskName});

		var taskList = this.state.tasks;
		//var taskTitle = this._inputElement.value;

		//if(this.isValidTitle(taskTitle)){//Check valid task title
		taskList.push({
			task: aTask,
			key: Date.now(), //Defining unique key
		});
		//}

		this.setState({
			tasks: taskList //Updating state
		});

		//this._inputElement.value = ""; //Reset input value

		//submitEvent.preventDefault(); //Overriding default submit event
	},

	removeTask: function (atask) {

		var taskList = this.state.tasks;

		var taskIndex = taskList.indexOf(task);

		taskList.splice(taskIndex, 1);

		this.setState({
			tasks: taskList
		});

	},	

	render: function () {

		var taskListEntries = this.state.tasks

		function createTasks(task) {

			return (
				<div>
					<li key={task.key} >{task.title}</li>
					<button onClick={this.removeTask(task)}>Excluir</button>
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

module.exports = TaskList;