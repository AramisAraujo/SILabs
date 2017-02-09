import {CirclePicker} from 'react-color';

var React = require('react');
var FontPicker = require('react-font-picker');
var SubTask = require('./SubTask.js');

var Task = React.createClass({

	getInitialState: function () {

		return ({color: this.props.color, title: this.props.title,
		font: "Courier New", id: this.props.taskID, completed: this.props.completed,
		tags: this.props.tags, priority: this.props.priority,
		description: this.props.description, subtasks: this.props.subtasks})
	},

	removeTask: function(submitEvent) {

		submitEvent.preventDefault();//Overrides default submit event
		this.props.removeTask(this.state.id);
		return;
	},

	toggleComplete: function (toggleEvent) {

		toggleEvent.preventDefault();//Overrides default toggle event

		var completed = this.state.completed === 
				true ? false : true;

		this.setState({completed: completed});
		
		this.props.updateCompletion(this.state.id, completed);

		return;		

	},

	changeColor: function(newColor) {

		this.setState({color: newColor.hex});
		return;
	},

	changeFont: function(newFont) {

		this.setState({font: newFont})
		return;
	},

	addTag: function(){

		var tagTitle = prompt("Insert new Tag:","Your Tag Here");

		if(tagTitle.trim() != '' && !this.state.tags.includes(tagTitle)){

			var tags = this.state.tags;

			tags.push(tagTitle);

			this.setState({tags:tags});

			this.props.updateTagTask(this.state.id, tags);
		}

		return;
	},

	removeTag: function(aTag){

		var tagData = this.state.tags;

		tagData = tagData.filter(function (tagElement) {
			return tagElement !== aTag;
		});

		this.setState({tags: tagData});

		return;
	},

	setPriority: function(newPriority){

		var priorities = ["low","medium","high"];

		newPriority = newPriority.toLowerCase().trim();

		if(priorities.includes(newPriority)){

			var color = this.getPriorityColor();

			this.setState({priority: newPriority});
			this.setState({color:color});
			this.props.changePrio(this.state.id, newPriority);
			this.props.changeColor(this.state.id, color);
		}

				
	},

	togglePriority: function(){

		var newPriority;
		var actualPriority = this.state.priority;

		if(actualPriority == "low"){
			newPriority = "medium";
		}
		else if(actualPriority == "medium"){
			newPriority = "high";
		}
		else if (actualPriority == "high"){
			newPriority = "low";
		}

		this.setPriority(newPriority);


	},

	setDescription: function(descInputEvent){

		var description = this.refs.description.value;

		description = description.trim();

		if(description != "" && description != this.state.description){

			this.setState({description:description});
			this.refs.description.value = description;
			this.props.updateDesc(this.state.id, description);
		}

		return;
	},

	addSubtask: function(){

		var title = prompt("Insert new SubTask Title:","SubTask Title");
		var checked = false;

		var subtaskData = this.state.subtasks.concat([{title,checked}]);

		this.setState({subtasks:subtaskData});

		this.props.updateSTask(this.state.id, subtaskData);

		
	},
	removeSubtask: function(subtaskTitle){

		var subtasks = this.state.subtasks.filter(function(subTask){
			return subTask.title != subtaskTitle;
		});

		this.setState({subtasks:subtasks});

		this.props.updateSTask(this.state.id,subtasks);
		
	},

	renderSubtasks: function(){


		if(this.state.subtasks == ""){
			return;
		}


		var subtasks = this.state.subtasks.map(function (staskItem){
			var id = this.generateID();

			return(<SubTask key={id} title={staskItem.title} 
				checked={staskItem.checked} update={this.handleSubUpdate}
				remover={this.removeSubtask}
			/>);
		}, this);

		return subtasks;
	},

	generateID: function () {

		return Date.now().toString();
	},

	handleSubUpdate: function(title, checked){
	
	var subtasks = this.state.subtasks;

	subtasks.map(function(subTask){
			if(subTask.title == title){
				subTask.checked = checked;
			}
		});



		this.props.updateSTask(this.state.id,subtasks);
	},

	getPriorityColor: function(){
		var actualPriority = this.state.priority;

		if(actualPriority == "low"){
			return "blue";
		}
		else if( actualPriority == "medium"){
			return "orange";
		}
		else{
			return "red";
		}
	},


	render: function () {

		var style = {color:this.state.color, fontFamily:this.state.font,backgroundColor: "transparent"};

		if(this.state.completed == true){

			var style = {color:this.state.color, fontFamily:this.state.font,backgroundColor: "gold"};		

		}

		return(


			<div className="myBoxTask" onDoubleClick={this.togglePriority}>

				<h2 style={style}>
					{this.props.title}
				</h2>
				{/*
				<h1>
					Pick a Color!
					<CirclePicker color={this.state.color} 
					onChangeComplete={this.changeColor}></CirclePicker>
				</h1>

				<h1>
					Pick a cool Font!
					<FontPicker label={this.state.font}  previews={false}
        			activeColor="#64B5F6" onChange={this.changeFont}/>
        		</h1>
				*/}
				<div >
        			<input className="descBox" type="text" placeholder={this.state.description} onBlur={this.setDescription} ref="description"/>
        		</div>
				<button type="button" style={{backgroundColor: "limegreen"}} 
				 onClick={this.toggleComplete}>&#x2713;</button>

				<a type="button" className="close-ribbon" onClick={this.removeTask}>&times;</a>
				<div>
					Subtasks:{this.renderSubtasks()}
					<button type="button" style={{backgroundColor: "orange"}} 
				 onClick={this.addSubtask}>+</button>
				</div>
				<div>
					Tags:{this.state.tags.toString()}
					<button type="button" style={{backgroundColor: "violet"}} 
				 onClick={this.addTag}>+</button>
				</div>
			</div>
				);}


});

module.exports = Task;