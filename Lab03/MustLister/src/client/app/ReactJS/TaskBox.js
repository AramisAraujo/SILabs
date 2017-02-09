
var React = require('react');
var TaskList = require('./TaskList.js');
var jQuery = require('jquery');

var TaskBox = React.createClass({

	getInitialState: function(){

		var now = Date.now().toString();
		var listsData = this.fetchLists();

		return{

		"lastUpdated":now,
		"listsData":listsData,
		};
	},

	updateData: function(){

		var listsData = this.fetchLists();
		var completion = this.getCompletion(listsData);

		this.setState({listsData:listsData});
		this.setState({completion:completion});

	},

	saveLists: function(){

		var listIds = this.getListsID;

		listsIds.map(function (id){
			saveListId(id);
		});


	},

	getCompletion: function(listsData){

		var completedTasks = 0.0;
		var taskCount = 0.0;

		listsData.map(function (listItem) {

			listItem.data.map(function (taskItem){

				if(taskItem.completed){

					completedTasks += 1;
				}
				taskCount += 1;
			});


			});
		var completionRate;

		if(taskCount == 0){

			completionRate = 0;
		}
		else{
			completionRate =  (completedTasks / taskCount) * 100;

		}

		return Math.ceil(completionRate);

	},

	saveListId: function(listID, newData){

		this.updateData();

		var listsData = this.state.listsData;

		var listData = listsData.filter(function (listItem){

				if(listItem.id == listID){
					listItem.data = newData;
					return true;
				}
			});

		const url = "http://localhost:8080/saveList";

		listData = JSON.stringify(listData[0]);

		jQuery.ajax({ type: "POST", url: url, data:listData, contentType: "application/json"});		

		this.updateData();

	},

	fetchLists: function(){

		var listIds = this.getListsID();

		var listsData = [];

		listIds.map(function (listID){

			var url = "http://localhost:8080/getTaskList?id=" + listID;

			var listData = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

			listData = JSON.parse(listData);

			listsData.push(listData);

		})

		function compareID(a,b) {
  			return parseInt(a.id) - parseInt(b.id);
		}

		listsData = listsData.sort(compareID);

		return listsData;

	},

	getListsID: function(){

		const url = "http://localhost:8080/getListsID";

		var listIds = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

		return JSON.parse(listIds);

	},

	createNewList: function(){

		var listTitle = prompt("Insert new TaskList Title","TaskList Title");

		var id = this.generateID();

		var stuff = ({"id":id,"title":listTitle,"data":{}});

		stuff = JSON.stringify(stuff);

		const url = "http://localhost:8080/createNewList";

		jQuery.ajax({ type: "POST", url: url, data:stuff, contentType: "application/json"});

		this.setState({lastUpdated:id});

		this.forceUpdate();

	},

	generateID: function () {

		return Date.now().toString();
	},

	renderTaskLists: function(){

		var lists = this.fetchLists();

		var renderedLists = lists.map(function (taskList){

			var data = taskList.data;

			return(<TaskList key={taskList.id} id={taskList.id}
				taskData={data}
				title={taskList.title} saveList={this.saveListId} completion={taskList.completion}
				removeList={this.removeTaskList}/>);

		}, this);

		return renderedLists;

	},

	removeTaskList: function(listId){

		const url = "http://localhost:8080/deleteList?id=" + listId;

		var listIds = jQuery.ajax({ type: "GET", url: url, async: false});


		this.updateData();
	},


	render: function () {

		return(
		<div>
			<div className="myBox">
				<h1>This is your MustLister [{this.getCompletion(this.state.listsData)}% Completed]</h1>
				{this.renderTaskLists()}
				<button type="button" style={{backgroundColor: "gold"}} onClick={this.createNewList}>+</button>
			</div>

			<div className="myBoxContact">
  				<h3>Aramis Araujo</h3>
  				<a href="https://github.com/AramisAraujo">Find me on Github</a>
  				<p></p>
  				<a href="mailto:aramis.araujo@ccc.ufcg.edu.br">Send me an E-mail</a>
  			</div>
		</div>
			);
	}
});


module.exports = TaskBox;

