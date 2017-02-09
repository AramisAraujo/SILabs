var React = require('react');

var SubTask = React.createClass({

	getInitialState: function() {
		
		return({
			checked:this.props.checked,
			title:this.props.title,

		});
	},


	toggleChecked: function(){

		var isChecked = this.state.checked === true ? false : true;

		this.setState({checked: isChecked});

		this.props.update(this.state.title, isChecked);

	},

	delete: function(){

		this.props.remover(this.state.title);

	},
	render: function(){

		var title = this.state.title;

	return(<div>
			<input type="checkbox" checked={this.state.checked} onChange={this.toggleChecked}/>
			<label htmlFor="Checkbox">{this.state.title}</label>
			<button type="button" style={{backgroundColor: "red"}} onClick={this.delete}>X</button>
		</div>
		);
	}

	});


module.exports = SubTask;