let React = require('react');
let Task = require('./Task.js');
let jQuery = require('jquery');

let TaskList = React.createClass({

	getInitialState: function () {

		let id = this.props.id;
        let title = this.loadTitle(id);
        let tasks = this.loadTasksList(id);

		let completion = this.getCompletion();

		return{
			id: id,
			title:title,
			completion: completion,
			filterTag: "",
			filterPriority:""
		};
	},

    loadTasksList: function (id) {

        const url = 'http://localhost:8080/getTLTasksID?id='+ id;

        let tasksId = jQuery.ajax({ type: "GET", url: url, async: false});

        return tasksId;

    },

    loadTitle: function (id) {

        const url = 'http://localhost:8080/getTLTitle?id='+ id;

        let title = jQuery.ajax({ type: "GET", url: url, async: false});

        return title;

    },

	handleTaskSubmit: function (title) {

		let data = this.state.data;
		let id = this.generateID();
		let tags = [];
		let completed = false;
		let description = "";
		let priority = "low";
		let color = "blue";

		if(data == []){
			data = data.concat([{id,title,completed,tags,description,priority,color}]);
		}
		else{

			data = data.concat([{id,title,completed,tags,description,priority,color}]);
		}

		this.setState({data});

		this.updateCompletion(data);

		this.props.saveList(this.state.id, data);

	},

	handleTaskRemoval: function(taskID) {

		let taskData = this.state.data;

		taskData = taskData.filter(function (element) {
			return element.id !== taskID;
		});

		this.setState({data: taskData});

		this.updateCompletion(taskData);

		this.props.saveList(this.state.id, taskData);

	},

	generateID: function () {

		return Date.now().toString();
	},

	updateCompletion: function(taskData){

		let completionRate = this.getCompletion(taskData);

		this.setState({completion: completionRate});

		this.props.saveList(this.state.id, taskData);

	},

	getCompletion: function(taskData){

		let completedTasks = 0.0;
		let taskCount = 0.0;

		if(taskData = []){
			return 0;
		}


		taskData.map(function (taskItem) {

			if(taskItem.completed){

				completedTasks += 1;
			}
			taskCount += 1;
		}, this);

		let completionRate;

		if(taskCount == 0){

			completionRate = 0;
		}
		else{
			completionRate =  (completedTasks / taskCount) * 100;

		}

		return Math.ceil(completionRate);

	},

	handleTaskCompletion: function(taskID, taskIsCompleted) {

		this.state.data.map(function (taskItem) {

			if(taskItem.id == taskID){

				taskItem.completed = taskIsCompleted;
			}

		}, this);

		let newData = this.state.data;

		this.updateCompletion(newData);

	},

	handleTaskDescUpdate: function(taskID, newDescription) {

		let data = this.state.data;

		data.map(function (taskItem) {

			if(taskItem.id == taskID){

				taskItem.description = newDescription;
			}

		}, this);

		this.props.saveList(this.state.id, data);

	},
	handleTaskTagUpdate: function(taskID, newTags) {

		let data = this.state.data;
		data.map(function (taskItem) {

			if(taskItem.id == taskID){

				taskItem.tags = newTags;
			}

		}, this);

		this.props.saveList(this.state.id, data);

	},

	handleTaskSubUpdate: function(taskID,subtaskData){

		let data = this.state.data;

		data.map(function (taskItem) {

			if(taskItem.id == taskID){
				taskItem.subtasks = subtaskData;
			}

		}, this);

		this.props.saveList(this.state.id, data);

	},

	handleTaskPrioUpdate: function(taskID,newPriority){

		let data = this.state.data;

		data.map(function (taskItem) {

		if(taskItem.id == taskID){

			taskItem.priority = newPriority;
			}

		}, this);

		this.props.saveList(this.state.id, data);

	},


	sortTaskPriority: function() {

		let sortedTasks = this.getHighPriorityTasks();

		sortedTasks = sortedTasks.concat(this.getMedPriorityTasks(), this.getLowPriorityTasks());

		this.setState({data: sortedTasks});

		return;
	},

	getLowPriorityTasks: function() {

		let taskData = this.state.data;

		let lowTasks = taskData.filter(function (taskItem) {
			return taskItem.priority == "low";
		});

		return lowTasks;

	},

	getMedPriorityTasks: function(){

		let taskData = this.state.data;

		let medTasks = taskData.filter(function (taskItem) {
			return taskItem.priority == "medium";
		});

		return medTasks;

	},

	getHighPriorityTasks: function(){

		let taskData = this.state.data;

		let highTasks = taskData.filter(function (taskItem) {
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

		let sortedTasks = this.state.data.sort(compareTitle);

		this.setState({data:sortedTasks});

		return;

	},

	filterByPriority: function(priority) {

		let priorities = ["low","medium","high"];

		priority = priority.toLowerCase().trim();

		let filteredTasks;

		if(priorities.includes(priority)){

			this.setState({filterPriority: priority});
		}
		else if (priority == "" && this.state.filterPriority != ""){
			this.setState({filterPriority:""});
		}

		return;

	},

	filterByTag: function(reset) {

		let tag;
		if(reset == true){
			tag = "";
		}
		else{

			tag = prompt("Input a single tag for filtering","#MyTag");
		}

		tag = tag.toLowerCase().trim();

		this.setState({filterTag: tag});

		return;

	},

	setTitle: function(newTitle) {

		newTitle = newTitle.trim();

		if(newTitle != ""){
			this.setState({title:newTitle});
		}

		this.props.saveList(this.state.id, this.state.data);

	},

	handleColorChange: function(taskID, newColor){

		let data = this.state.data;

		data.map(function (taskItem) {

		if(taskItem.id == taskID){

			taskItem.color = newColor;
			}

		}, this);

		this.props.saveList(this.state.id, data);

	},

	renderTasks: function(taskData){

		let prio = this.state.filterPriority;
		let tagFilter = this.state.filterTag;

		if(prio != ""){
			taskData = taskData.filter(function (taskItem){
				return taskItem.priority == prio;
			});
		}

		if(tagFilter != ""){
			taskData = taskData.filter(function (taskItem){
				let tags = taskItem.tags;
				return tags.includes(tagFilter);
			});
		}

		if(taskData == ""){

			taskData = [];
		}

		let listTasks = taskData.map(function (taskItem){

			return(
				<li key={taskItem.id}>
					<Task key={taskItem.id} taskID={taskItem.id} title={taskItem.title}
					completed={taskItem.completed} tags={taskItem.tags} removeTask={this.handleTaskRemoval}
					font={this.props.font} updateCompletion = {this.handleTaskCompletion}
					description={taskItem.description}
					priority={taskItem.priority}
					subtasks={taskItem.subtasks}
					updateDesc={this.handleTaskDescUpdate}
					updateSTask={this.handleTaskSubUpdate}
					changePrio={this.handleTaskPrioUpdate}
					color={taskItem.color}
					changeColor={this.handleColorChange}
					updateTagTask={this.handleTaskTagUpdate}
					/>
				</li>

			);
		}, this);

		return listTasks;

	},

	removeList: function(){

		this.props.removeList(this.state.id);
	},

	render: function () {

		let tasks;
		if(this.state.data != []){

			tasks = this.renderTasks(this.state.data);

		}

		else{
			tasks = "";
		}

		return(
			<ul key={this.state.id} className="myBoxList" onClick={this.handleClick}>
				<h1>{this.state.title}</h1>
				<h1>Completion rate: {this.state.completion} %</h1>

				{tasks}

				<TaskSubmitter onTaskSubmit={this.handleTaskSubmit}/>
				<button type="button" style={{backgroundColor: "gold"}} onClick={this.sortTaskPriority}>Sort Priority</button>
				<button type="button" style={{backgroundColor: "silver"}} onClick={this.sortTaskTitle}>Sort Title</button>
				<button type="button" style={{backgroundColor: "pink"}} onClick={this.filterByPriority.bind(this,"High")}>Filter High</button>
				<button type="button" style={{backgroundColor: "pink"}} onClick={this.filterByPriority.bind(this,"Medium")}>Filter Medium</button>
				<button type="button" style={{backgroundColor: "pink"}} onClick={this.filterByPriority.bind(this,"Low")}>Filter Low</button>
				<button type="button" style={{backgroundColor: "aqua"}} onClick={this.filterByTag}>Filter by Tag</button>

				<button type="button" style={{backgroundColor: "turquoise"}} onClick={this.filterByPriority.bind(this,"")}>Reset Priority Filter</button>
				<button type="button" style={{backgroundColor: "turquoise"}} onClick={this.filterByTag.bind(this,true)}>Reset Tag Filter</button>
				<a type="button"className="close-ribbon" onClick={this.removeList}>&times;</a>
			</ul>
			);
	}

});

let TaskSubmitter = React.createClass({

	doSubmit: function (submitEvent) {

		submitEvent.preventDefault(); //Overrides default submit event

		let taskTitle = this.refs.task.value.trim();

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