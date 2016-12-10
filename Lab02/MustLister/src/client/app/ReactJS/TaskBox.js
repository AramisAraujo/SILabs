
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

	handleColorChange: function(newColor) {

		this.setState({color: newColor.hex});
		return;
	},

	handleFontChange: function(newFont) {

		this.setState({font: newFont});
		return;
	},

	render: function () {

		var listStyle = {color:this.state.color, fontFamily:this.state.font};

		return(
		
		<div>
			<h1 className="vert-offset-top-0">My To do List:</h1>
			<Menu fontChanger={this.handleFontChange} colorChanger={this.handleColorChange}
			 color={this.state.color}/>

			<h1>Todo List:</h1>

			<TaskList data={this.state.data} removeTask ={this.handleTaskRemoval}
			toggleComplete={this.handleToggleCompleted} font={this.state.font}
			color={this.state.color} style={listStyle}/>

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
			<div className="commentForm vert-offset-top-2">
				<hr />
					<div className="clearfix">				
					<form onSubmit={this.doSubmit}>
						<div className="form-group">
							<label htmlFor="task" className="col-md-2 control-label">Tell me what you must:</label>
							<div className="col-md-10">
								<input type="text" id="task" ref="task" placeholder="I have to..." />
							</div>
						</div>
						<div className="row">
							<div className="col-md-10 col-md-offset-2 text-right">
								<input type="submit" value="Save Task" className="btn btn-primary" />
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}

});


module.exports = TaskBox;

