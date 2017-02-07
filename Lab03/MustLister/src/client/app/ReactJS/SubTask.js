var React = require('react');

var SubTask = React.createClass({

	getInitialState: function() {
		
		return({
			checked:this.props.checked,
			title:this.props.title
		});
	},


	toggleChecked: function(){

		var isChecked = this.state.checked === true ? false : true;

		this.setState({checked: isChecked});
	},

	render: function(){

	return(<div>
			<input id="Checkbox" name="Checkbox" type="checkbox"/>
			<label htmlFor="Checkbox">{this.state.title}</label>
		</div>
		);
	}

	});


module.exports = SubTask;