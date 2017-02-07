var React = require('react');
var Task = require('./Task.js');
import Request from 'react-http-request';

var TaskList = React.createClass({

	getInitialState: function () {
		return{
			data: [
				{"id":"00001","title":"Study some more","completed":false,tags: ["yo","yeah","haha","we are tags"],"description":"", "priority":"low"},
				{"id":"00002","title":"Make some neat CSS","completed":false, tags: [], "description":"","priority":"medium"},
				{"id":"00003","title":"Have some fun","completed":false, tags: [], "description":"","priority":"high"}
			],
			color: "black",
			font: "Arial",
			completion: 0,
			filterTag: "",
			filterPriority:"",
			title:"TaskList Title"
		};
	},


	handleTaskSubmit: function (title) {

		var data = this.state.data;
		var id = this.generateID();
		var tags = [];
		var completed = false;
		var description = "";
		var priority = "low";

		data = data.concat([{id,title,completed,tags,description,priority}]);

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

		var newData = this.state.data;

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

	sortTaskTitle: function() {

		function compareTitle(a,b) {
  			if (a.title.toLowerCase() < b.title.toLowerCase())
    			return -1;
  			if (a.title.toLowerCase() > b.title.toLowerCase())
   				return 1;
 			return 0;
		}

		var sortedTasks = this.state.data.sort(compareTitle);

		this.setState({data:sortedTasks});

		return;

	},

	filterByPriority: function(priority) {

		var priorities = ["low","medium","high"];

		priority = priority.toLowerCase().trim();

		var filteredTasks;

		if(priorities.includes(priority)){

			this.setState({filterPriority: priority});
		}
		else if (priority == "" && this.state.filterPriority != ""){
			this.setState({filterPriority:""});
		}

		return;

	},

	filterByTag: function(tag) {

		tag = tag.toLowerCase().trim();

		this.setState({filterTag: tag});

		return;

	},

	setTitle: function(newTitle) {

		newTitle = newTitle.trim();

		if(newTitle != ""){
			this.setState({title:newTitle});
		}

		return;

	},

	fetchList: function(){

		const url = "";

		jQuery.getJSON(url);

	},

	renderTasks: function(taskData){

		// var taskData = this.state.data;
		var prio = this.state.filterPriority;
		var tagFilter = this.state.filterTag;

		// if(prio != ""){
		// 	taskData = taskData.filter(function (taskItem){
		// 		return taskItem.priority == prio;
		// 	});
		// }

		// if(tagFilter != ""){
		// 	taskData = taskData.filter(function (taskItem){
		// 		var tags = taskItem.tags;
		// 		return tags.includes(tagFilter);
		// 	});
		// }
		
		// var listTasks = taskData.map(function (taskItem){

			return(
				<li key={taskData.id}>
					<Task key={taskData.id} taskID={taskData.id} title={taskData.title}
					completed={taskData.completed} tags={taskData.tags} removeTask={this.handleTaskRemoval}
					font={this.props.font} updateCompletion = {this.handleTaskCompletion}
					updateDesc={this.handleTaskDescUpdate}
					/>
				</li>

			);
		// }, this);

		// return listTasks;

	},

	render: function () {

		// var tasks = this.renderTasks();




		return(
			<ul className="myBoxList" onClick={this.handleClick}>
				<h1>{this.state.title}</h1>
				<h1>Completion rate: {this.state.completion} %</h1>

			<Request url='http://localhost:8080/getLists' method='get'
			 accept='application/json' verbose={true} 
			 headers={{"Access-Control-Allow-Origin": "*"}}>
      			{({error, result, loading}) => {
            		if (loading) {
              			return <div>loading...</div>;
            		} else {
              			return this.renderTasks(result);
            			}
          			}
        		}
      		</Request>

				<TaskSubmitter onTaskSubmit={this.handleTaskSubmit}/>
				<button type="button" style={{backgroundColor: "gold"}} onClick={this.sortTaskPriority}>Sort Priority</button>
				<button type="button" style={{backgroundColor: "silver"}} onClick={this.sortTaskTitle}>Sort Title</button>
				<button type="button" style={{backgroundColor: "pink"}} onClick={this.filterByPriority.bind(this,"High")}>Filter High</button>
				<button type="button" style={{backgroundColor: "pink"}} onClick={this.filterByPriority.bind(this,"Medium")}>Filter Medium</button>
				<button type="button" style={{backgroundColor: "pink"}} onClick={this.filterByPriority.bind(this,"Low")}>Filter Low</button>
				<button type="button" style={{backgroundColor: "turquoise"}} onClick={this.filterByPriority.bind(this,"")}>Reset Priority Filter</button>
				<button type="button" style={{backgroundColor: "turquoise"}} onClick={this.filterByTag.bind(this,"")}>Reset Tag Filter</button>
			</ul>
			);


	}

});

var TaskSubmitter = React.createClass({

	doSubmit: function (submitEvent) {

		submitEvent.preventDefault(); //Overrides default submit event

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
			<div className="myBoxInput">			
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