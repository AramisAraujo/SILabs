var React = require('react');
var TaskList = require('./TaskList.js');

var TaskBox = React.createClass({

	getInitialState: function () {
		return{
			data: [
				{"id":"00001","title":"First Task","completed":"false"},
				{"id":"00002","title":"Second Task","completed":"false"},
				{"id":"00003","title":"Third Task","completed":"false"}
			]
		};
	},

	generateID: function () {

		return Date.now().toString();
	},

	handleTaskRemoval: function(taskID) {

		var data = this.state.data;

		data = data.filter(function (element) {
			return element.id !== taskID;
		});

		this.setState({data});

		return;

	},

	handleTaskSubmit: function (title) {

		var data = this.state.data;
		var id = this.generateID();
		var completed = "false";

		data = data.concat([{id,title,completed}]);

		this.setState({data});

	},

	handleToggleCompleted: function (taskID) {
		var data = this.state.data;

		for (var elementIndex in data) {

			if(data[elementIndex].id == taskID){
				data[elementIndex].completed = data[elementIndex].completed === 
				"true" ? "false" : "true";

				break;
			}
		}

		this.setState({data});
		return;
	},

	render: function () {

		return(
		<div>
			<h1>Todo List:</h1>

			<TaskList data={this.state.data} removeTask ={this.handleTaskRemoval}
			toggleComplete={this.handleToggleCompleted} />
			<TaskSubmitter onTaskSubmit={this.handleTaskSubmit}/>

		</div>
			);
	}
});

var TaskSubmitter = React.createClass({

	doSubmit: function (submitEvent) {

		submitEvent.preventDefault(); //Override default submit event

		var taskTitle = this.refs.task.value.trim();

		if(!task){
			return;
		}

		this.props.onTaskSubmit(taskTitle);

		this.refs.task.value = "";

		return;

	},

	render: function() {
		return (
			<div>
				<form onSubmit={this.doSubmit}>
					<label htmlFor="task">Task</label>
						<input type="text" id="task" ref="task" placeholder="Diga-me, o que precisa fazer?" />
						<input type="submit" value="Save Task" />
				</form>
			</div>
		);
	}

});


module.exports = TaskBox;

