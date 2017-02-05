import {CirclePicker} from 'react-color';

var React = require('react');
var FontPicker = require('react-font-picker');
var SubTask = require('./SubTask.js');

var Task = React.createClass({

	getInitialState: function () {

		return ({color: "black", title: this.props.title,
		font: "Courier New", id: this.props.taskID, completed: false,
		tags: [], priority: "low", description: "", subtasks: [] })
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

	addTag: function(newTag){

		var tagData = this.state.tags;

		if(tag.trim() != '' && !tagData.include(tag)){

			tagData = tagData.concat([tag]);
			this.setState({tags: tagData});
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

		if(priorities.include(newPriority)){

			this.setState({priority: newPriority});
		}

		return;		
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

	addSubtask: function(subtask){

		
	},
	removeSubtask: function(subtask){

		
	},

	render: function () {

		var style = {color:this.state.color, fontFamily:this.state.font,backgroundColor: "transparent"};

		if(this.state.completed == true){

			var style = {color:this.state.color, fontFamily:this.state.font,backgroundColor: "gold"};		

		}

		return(
			<div className="myBox">

				<h1 style={style}>
					{this.props.title}
				</h1>
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
				<div className="descBox">
        			<input type="text" placeholder={this.state.description} onBlur={this.setDescription} ref="description"/>
        		</div>
				<button type="button" style={{backgroundColor: "limegreen"}} className="pure-button pure-button-active"
				 onClick={this.toggleComplete}>&#x2713;</button>

				<a type="button"className="close-ribbon" onClick={this.removeTask}>&times;</a>
			</div>
				);}


});

module.exports = Task;