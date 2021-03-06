import {CirclePicker} from 'react-color';

var React = require('react');
var FontPicker = require('react-font-picker');

var Task = React.createClass({

	getInitialState: function () {

		return ({color: "black", title: this.props.title,
		font: "Courier New", id: this.props.taskID, completed: false })
	},

	removeTask: function(submitEvent) {

		submitEvent.preventDefault();//Override default submit event
		this.props.removeTask(this.state.id);
		return;
	},

	toggleComplete: function (toggleEvent) {

		toggleEvent.preventDefault();//Override default toggle event

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

	render: function () {

		var style = {color:this.state.color, fontFamily:this.state.font,backgroundColor: "transparent"};

		if(this.state.completed == true){

		var style = {color:this.state.color, fontFamily:this.state.font,backgroundColor: "gold"};		

		}

		return(
			<div className="myBoxTask">				
				<h1 style={style}>
					{this.props.title}
				</h1>

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

				<button type="button" style={{backgroundColor: "limegreen"}} className=""
				 onClick={this.toggleComplete}>&#x2713;</button>

				<a type="button"className="close-ribbon"
				 onClick={this.removeTask}>&times;</a>
			</div>
				);}


});

module.exports = Task;