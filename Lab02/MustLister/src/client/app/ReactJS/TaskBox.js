
var React = require('react');
var TaskList = require('./TaskList.js');

var Menu = require('./Menu.js')

var TaskBox = React.createClass({

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


	render: function () {

		var listStyle = {color:this.state.color, fontFamily:this.state.font};

		return(
		
		<div className="pure-g">
			<div className="pure-u-1-3">
				<h1>My To do List:</h1>

				<h1>Todo List:</h1>

				<TaskList data={this.state.data} removeTask ={this.handleTaskRemoval}
				toggleComplete={this.handleToggleCompleted} font={this.state.font}
				color={this.state.color} style={listStyle}/>

				<TaskSubmitter onTaskSubmit={this.handleTaskSubmit}/>
			</div>
			<div className="pure-g">

				<h1>Oie</h1>
			</div>
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
				<div>				
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
			</div>
		);
	}

});


module.exports = TaskBox;

