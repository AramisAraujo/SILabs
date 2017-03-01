
let React = require('react');
let TaskList = require('./TaskList.js');
let jQuery = require('jquery');

const host = 'https://mustlisterspring.herokuapp.com';

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

	getCompletion: function(listIds){

	    let url = host + '/getCompletionRate';

		let completion = JSON.parse(jQuery.ajax({ type: "GET", url: url, async: false}).responseText);

		return Math.ceil(completion * 100);

	},

	getListsID: function(){

		const url = host + '/getListsID';

		let listIds = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

		return JSON.parse(listIds);
	},

	createNewList: function(){

		let listTitle = prompt("Insert new TaskList Title","TaskList Title");

		let  url = host + '/createNewList?title=';

		url = url + listTitle;

	    jQuery.ajax({ type: "GET", url: url, async:false});

		this.updateData();

		this.forceUpdate();

	},

	renderTaskLists: function(){

		let lists = this.getListsID();

		let renderedLists = lists.map(function (taskListId){

			return(<TaskList key={taskListId} id={taskListId}
				removeList={this.removeTaskList} updateCompletion={this.updateData}/>);

		}, this);

		return renderedLists;

	},

	removeTaskList: function(listId){

		const url = host + '/deleteList?id=' + listId;

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

