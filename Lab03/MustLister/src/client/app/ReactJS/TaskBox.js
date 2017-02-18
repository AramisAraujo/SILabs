
let React = require('react');
let TaskList = require('./TaskList.js');
let jQuery = require('jquery');

let TaskBox = React.createClass({

	getInitialState: function(){

		let now = Date.now().toString();
		let listsData = this.fetchLists();

		return{

		"lastUpdated":now,
		"listsData":listsData,
		};
	},

	updateData: function(){

		let listsData = this.fetchLists();
		let completion = this.getCompletion(listsData);

		this.setState({listsData:listsData});
		this.setState({completion:completion});

	},

	saveLists: function(){

		let listIds = this.getListsID;

		listsIds.map(function (id){
			saveListId(id);
		});


	},

	getCompletion: function(listsData){

		let completedTasks = 0.0;
		let taskCount = 0.0;

		listsData.map(function (listItem) {

			if(listItem.data == []){
				return 0;
			}

			listItem.data.map(function (taskItem){

				if(taskItem.completed){

					completedTasks += 1;
				}
				taskCount += 1;
			});


			});
		let completionRate;

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

		let listsData = this.state.listsData;

		let listData = listsData.filter(function (listItem){

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

		let listIds = this.getListsID();

		let listsData = [];

		listIds.map(function (listID){

			let url = "http://localhost:8080/getTaskList?id=" + listID;

			let listData = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

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

		let listIds = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

		return JSON.parse(listIds);

	},

	createNewList: function(){

		let listTitle = prompt("Insert new TaskList Title","TaskList Title");

		let id = this.generateID();

		let stuff = ({"id":id,"title":listTitle,"data":{}});

		stuff = JSON.stringify(stuff);

		const url = "http://localhost:8080/createNewList";

		jQuery.ajax({ type: "POST", url: url, data:stuff, contentType: "application/json"});

		this.setState({lastUpdated:id});

		this.updateData();

		this.forceUpdate();

	},

	generateID: function () {

		return Date.now().toString();
	},

	renderTaskLists: function(){

		let lists = this.fetchLists();

		let renderedLists = lists.map(function (taskList){

			let data = taskList.data;

			return(<TaskList key={taskList.id} id={taskList.id}
				taskData={data}
				title={taskList.title} saveList={this.saveListId} completion={taskList.completion}
				removeList={this.removeTaskList}/>);

		}, this);

		return renderedLists;

	},

	removeTaskList: function(listId){

		const url = "http://localhost:8080/deleteList?id=" + listId;

		let listIds = jQuery.ajax({ type: "GET", url: url, async: false});


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

