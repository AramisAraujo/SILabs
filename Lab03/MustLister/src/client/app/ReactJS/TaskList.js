let React = require('react');
let Task = require('./Task.js');
let jQuery = require('jquery');
let fileDownload = require('react-file-download');

const host = 'https://mustlisterspring.herokuapp.com';

let TaskList = React.createClass({

	getInitialState: function () {

		let id = this.props.id;
        let title = this.loadTitle(id);
        let tasks = this.loadTasksList(id);

		let completion = this.getCompletion(tasks);

		return{
			id: id,
			title:title,
			completion: completion,
			tasks: tasks,
			filterTag: "",
			filterPriority:""
		};
	},

	downloadList: function(){

		let url = host + '/getListToDownload';

		url = url + '?id=' + this.state.id;

		let data = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

		let filename = this.state.title + '.csv';

		return (fileDownload(data, filename));

	},

    loadTasksList: function (id) {

        const url = host + '/getTLTasksID?id='+ id;

        let tasksId = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return JSON.parse(tasksId);

    },

    loadTitle: function (id) {

        const url = host + '/getTLTitle?id='+ id;

        let title = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return title;

    },

	handleTaskSubmit: function (title) {

        let url = host + '/createTask?title='+ title;

        url = url + '&listId=' + this.state.id;

        let taskId = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        taskId = JSON.parse(taskId);

        let tasks = this.state.tasks;

        tasks = tasks.concat(taskId);

        this.updateCompletion(tasks);

        this.setState({tasks: tasks});

	},

	handleTaskRemoval: function(taskID) {

		let tasks = this.state.tasks;

		tasks = tasks.filter(function (id) {
			return id !== taskID;
		});


        let url = host + '/removeTask?id='+ this.state.id;

        url = url + '&taskId='+taskID;

        jQuery.ajax({ type: "GET", url: url, async: false});

        this.updateCompletion();

        this.props.updateCompletion();

        this.setState({tasks: tasks});

	},


	updateCompletion: function(){

	    let tasks = this.loadTasksList(this.state.id);

		let completionRate = this.getCompletion(tasks);

		this.props.updateCompletion();

		this.setState({completion: completionRate});

	},

	getCompletion: function(taskIdList){

		let completedTasks = 0.0;
		let taskCount = 0.0;


		if(taskIdList === []){
			return 0;
		}

		taskIdList.map(function (taskId) {

            const url = host + '/getTaskCompletion?id='+ taskId;

            let completed = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

            completed = JSON.parse(completed);

			if(completed){

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

	sortTaskPriority: function() {

		let sortedTasks = this.getHighPriorityTasks();

		sortedTasks = sortedTasks.concat(this.getMedPriorityTasks(), this.getLowPriorityTasks());

		this.setState({tasks: sortedTasks});

	},

	getLowPriorityTasks: function() {

		let tasksList = this.state.tasks;

		let lowTasks = tasksList.filter(function (taskId) {

            const url = host + '/getTaskPrio?id='+ taskId;

            let priority = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

			return priority == "low";
		});

		return lowTasks;

	},

	getMedPriorityTasks: function(){

        let tasksList = this.state.tasks;

        let medTasks = tasksList.filter(function (taskId) {

            const url = host + '/getTaskPrio?id='+ taskId;

            let priority = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

            return priority == "medium";
        });

        return medTasks;

	},

	getHighPriorityTasks: function(){

        let tasksList = this.state.tasks;

        let highTasks = tasksList.filter(function (taskId) {

            const url = host + '/getTaskPrio?id='+ taskId;

            let priority = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

            return priority == "high";
        });

        return highTasks;

	},

	sortTaskTitle: function() {

		function compareTitle(a,b) {
  			if (a[1].toLowerCase() < b[1].toLowerCase())
    			return -1;
  			if (a[1].toLowerCase() > b[1].toLowerCase())
   				return 1;
 			return 0;
		}

		let taskIds = this.state.tasks;

		let tasksTitleAndId = [];

		taskIds.map(function (id) {
            const url = host + '/getTaskTitle?id='+ id;

            let title = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

            tasksTitleAndId = tasksTitleAndId.concat([[id,title]]);

        });


		let sortTasks = tasksTitleAndId.sort(compareTitle);

		let sorted = [];

		sortTasks.map(function (item) {

		    sorted = sorted.concat(item[0]);

        });


		this.setState({tasks:sorted});


	},

	filterByPriority: function(priority) {

		let priorities = ["low","medium","high"];

		priority = priority.toLowerCase().trim();

		if(priorities.includes(priority)){

			this.setState({filterPriority: priority});
		}
		else if (priority == "" && this.state.filterPriority != ""){
			this.setState({filterPriority:""});
		}

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

	},

	setTitle: function(newTitle) {

		newTitle = newTitle.trim();

		if(newTitle != ""){
            let url = host + '/changeTLTitle?id='+ id;

            url = url + '&title=' + newTitle;
            jQuery.ajax({ type: "GET", url: url, async: false});

            this.setState({title:newTitle});
        }

	},

	renderTasks: function(taskIdList){

		let prio = this.state.filterPriority;
		let tagFilter = this.state.filterTag;

		if(prio != ""){
			taskIdList = taskIdList.filter(function (taskId){

                const url = host + '/getTaskPrio?id='+ taskId;

                let priority = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

				return priority == prio;
			});
		}

		if(tagFilter != ""){
			taskIdList = taskIdList.filter(function (taskId){

                const url = host + '/getTaskTags?id='+ taskId;

                let tags = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

                tags = JSON.parse(tags);

				return tags.includes(tagFilter);
			});
		}


		let taskListing = taskIdList.map(function (taskId){

			return(
				<li key ={taskId}>
					<Task key={taskId} taskID={taskId} remover={this.handleTaskRemoval}
                    updateCompletion={this.updateCompletion}/>
				</li>

			);
		}, this);

		return taskListing;

	},

	removeList: function(){

		this.props.removeList(this.state.id);
	},

	render: function () {

		let tasks;
		if(this.state.tasks.length > 0){

			tasks = this.renderTasks(this.state.tasks);

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
				<button type="button" style={{backgroundColor: "aqua"}} onClick={this.downloadList}>Download This List</button>
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