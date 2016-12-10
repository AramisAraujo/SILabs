import {CirclePicker} from 'react-color';
var React = require('react');
var FontPicker = require('react-font-picker');

var Menu = React.createClass({

	render: function () {
		return(
			<div>
				<h1>Pick a Color!
					<CirclePicker color={this.props.color} 
					onChangeComplete={this.props.colorChanger}></CirclePicker>
				</h1>
				<h1>
					Pick a cool Font!
					<FontPicker label="Arial"  previews={true}
        			activeColor="#64B5F6" onChange={this.props.fontChanger}/>
        		</h1>
			</div>);
	}
});


module.exports = Menu;