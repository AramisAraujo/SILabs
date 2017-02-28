
let React = require('react');
let TaskList = require('./TaskList.js');
let jQuery = require('jquery');

let TaskBox = React.createClass({

	getInitialState: function(){

		let now = Date.now().toString();
		let listIds = this.getListsID();

		return{

		"lastUpdated":now,
		"listIds":listIds,
		};
	},

	updateData: function(){

		let listIds = this.getListsID();
		let completion = this.getCompletion(listIds);

		this.setState({listIds:listIds});
		this.setState({completion:completion});

	},

	// saveLists: function(){
    //
	//     //take a look
    //
	// 	let listIds = this.getListsID();
    //
	// 	listsIds.map(function (id){
	// 		saveListId(id);
	// 	});
    //
    //
	// },

	getCompletion: function(listIds){

	    let url = 'http://localhost:8080/getCompletionRate';

		let completion = JSON.parse(jQuery.ajax({ type: "GET", url: url, async: false}).responseText);

		return Math.ceil(completion * 100);

	},

	// saveListId: function(listID, newData){
    //
	// 	this.updateData();
    //
	// 	let listsData = this.state.listsData;
    //
	// 	let listData = listsData.filter(function (listItem){
    //
	// 			if(listItem.id == listID){
	// 				listItem.data = newData;
	// 				return true;
	// 			}
	// 		});
    //
	// 	const url = "http://localhost:8080/saveList";
    //
	// 	listData = JSON.stringify(listData[0]);
    //
	// 	jQuery.ajax({ type: "POST", url: url, data:listData, contentType: "application/json"});
    //
	// 	this.updateData();
    //
	// },

	// fetchLists: function(){
	//
	//     //get only the ids
    //
	// 	let listIds = this.getListsID();
    //
	// 	let listsData = [];
    //
	// 	listIds.map(function (listID){
    //
	// 		let url = "http://localhost:8080/getTaskList?id=" + listID;
    //
	// 		let listData = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;
    //
	// 		listData = JSON.parse(listData);
    //
	// 		listsData.push(listData);
    //
	// 	})
    //
	// 	function compareID(a,b) {
  	// 		return parseInt(a.id) - parseInt(b.id);
	// 	}
    //
	// 	listsData = listsData.sort(compareID);
    //
	// 	return listsData;
    //
	// },

	getListsID: function(){

		const url = "http://localhost:8080/getListsID";

		let listIds = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

		return JSON.parse(listIds);
	},

	createNewList: function(){

		let listTitle = prompt("Insert new TaskList Title","TaskList Title");

		// let id = this.generateID();

		// let stuff = ({"id":id,"title":listTitle,"data":{}});

		// stuff = JSON.stringify(stuff);

		let  url = "http://localhost:8080/createNewList?title=";

		url = url + listTitle;

	    jQuery.ajax({ type: "GET", url: url, async:false});

		// this.setState({lastUpdated:id});

		this.updateData();

		this.forceUpdate();

	},

	// generateID: function () {
    //
	// 	return Date.now().toString();
	// },

	renderTaskLists: function(){

		let lists = this.getListsID();

		let renderedLists = lists.map(function (taskListId){

			return(<TaskList key={taskListId} id={taskListId}
				removeList={this.removeTaskList} updateCompletion={this.updateData}/>);

		}, this);

		return renderedLists;

	},

	removeTaskList: function(listId){

		const url = "http://localhost:8080/deleteList?id=" + listId;

		jQuery.ajax({ type: "GET", url: url, async: false});

		this.updateData();
	},


	render: function () {

		return(
		<div>
			<div className="myBox">
				<h1>This is your MustLister [{this.getCompletion(this.state.listIds)}% Completed]</h1>
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

