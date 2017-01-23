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

		var ribbon;

		if(this.state.completed){
			ribbon = (<div className="myBoxTaskRibbon">
						<span>Done !</span>
					</div>)
		}

		else{
			ribbon = (<div><h1>Empty</h1></div>)
		}

		}

		return(
			<div className="myBoxTask">

				{ribbon}
				
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

				<button type="button" style={{backgroundColor: "limegreen"}} className="pure-button pure-button-active"
				 onClick={this.toggleComplete}>&#x2713;</button>

				<button type="button" style={{backgroundColor: "crimson"}} className="pure-button pure-button-active"
				 onClick={this.removeTask}>&#xff38;</button>
			</div>
				);}


});

module.exports = Task;