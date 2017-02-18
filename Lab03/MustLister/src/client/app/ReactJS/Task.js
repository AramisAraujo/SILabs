import {CirclePicker} from 'react-color';

let React = require('react');
let FontPicker = require('react-font-picker');
let SubTask = require('./SubTask.js');

let Task = React.createClass({

	getInitialState: function () {

		return ({color: this.props.color, title: this.props.title,
		font: "Courier New", id: this.props.taskID, completed: this.props.completed,
		tags: this.props.tags, priority: this.props.priority,
		description: this.props.description, subtasks: this.props.subtasks})
	},

	removeTask: function(submitEvent) {

		submitEvent.preventDefault();//Overrides default submit event
		this.props.removeTask(this.state.id);

	},

	toggleComplete: function (toggleEvent) {

		toggleEvent.preventDefault();//Overrides default toggle event

		let completed = this.state.completed ===
				true ? false : true;

		this.setState({completed: completed});
		
		this.props.updateCompletion(this.state.id, completed);


	},

	changeColor: function(newColor) {

		this.setState({color: newColor.hex});

	},

	changeFont: function(newFont) {

		this.setState({font: newFont})

	},

	addTag: function(){

		let tagTitle = prompt("Insert new Tag:","Your Tag Here");

		if(tagTitle.trim() != '' && !this.state.tags.includes(tagTitle)){

			let tags = this.state.tags;

			tags.push(tagTitle);

			this.setState({tags:tags});

			this.props.updateTagTask(this.state.id, tags);
		}


	},

	removeTag: function(aTag){

		let tagData = this.state.tags;

		tagData = tagData.filter(function (tagElement) {
			return tagElement !== aTag;
		});

		this.setState({tags: tagData});

	},

	setPriority: function(newPriority){

		let priorities = ["low","medium","high"];

		newPriority = newPriority.toLowerCase().trim();

		if(priorities.includes(newPriority)){

			let color = this.getPriorityColor(newPriority);

			this.setState({priority: newPriority, color:color});
			this.props.changePrio(this.state.id, newPriority);
			this.props.changeColor(this.state.id, color);
		}

		this.forceUpdate();		
	},

	togglePriority: function(){

		let newPriority;
		let actualPriority = this.state.priority;

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

		let description = this.refs.description.value;

		description = description.trim();

		if(description != "" && description != this.state.description){

			this.setState({description:description});
			this.refs.description.value = description;
			this.props.updateDesc(this.state.id, description);
		}

	},

	addSubtask: function(){

		let title = prompt("Insert new SubTask Title:","SubTask Title");
		let checked = false;

		let subtaskData = this.state.subtasks.concat([{title,checked}]);

		this.setState({subtasks:subtaskData});

		this.props.updateSTask(this.state.id, subtaskData);

		
	},

	removeSubtask: function(subtaskTitle){

		let subtasks = this.state.subtasks.filter(function(subTask){
			return subTask.title != subtaskTitle;
		});

		this.setState({subtasks:subtasks});

		this.props.updateSTask(this.state.id,subtasks);
		
	},

	renderSubtasks: function(){

		if(this.state.subtasks == undefined){
			return;
		}

		let subtasksToRender = this.state.subtasks.map(function (staskItem){
			let id = this.generateID();

			return(<SubTask key={id} title={staskItem.title} 
				checked={staskItem.checked} update={this.handleSubUpdate}
				remover={this.removeSubtask}
			/>);
		}, this);

		return subtasksToRender;
	},

	generateID: function () {

		return Date.now().toString();
	},

	handleSubUpdate: function(title, checked){
	
	let subtasks = this.state.subtasks;

	subtasks.map(function(subTask){
			if(subTask.title == title){
				subTask.checked = checked;
			}
		});

		this.props.updateSTask(this.state.id,subtasks);
	},

	getPriorityColor: function(priority){

		if(priority == "low"){
			return "blue";
		}
		else if(priority == "medium"){
			return "orange";
		}
		else{
			return "red";
		}
	},

	removeTag: function(){
		let tagToRemove = prompt("Input tag for removal","Tag to Remove");
		let tags = this.state.tags;

		tags = tags.filter(function (tagTitle){

			return tagTitle != tagToRemove.toLowerCase();

		});

		this.setState({tags:tags});

		this.props.updateTagTask(this.state.id, tags);
	},


	render: function () {

		let style = {color:this.state.color, fontFamily:this.state.font,backgroundColor: "transparent"};

		if(this.state.completed == true){

			let style = {color:this.state.color, fontFamily:this.state.font,backgroundColor: "gold"};

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
				 <button type="button" style={{backgroundColor: "#737CEE"}}
				  onClick={this.removeTag}>Remove Tag</button>
				</div>
			</div>
				);}


});

module.exports = Task;