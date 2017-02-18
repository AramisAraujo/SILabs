let React = require('react');

let SubTask = React.createClass({

	getInitialState: function() {
		
		return({
			checked:this.props.checked,
			title:this.props.title,

		});
	},


	toggleChecked: function(){

		let isChecked = this.state.checked === true ? false : true;

		this.setState({checked: isChecked});

		this.props.update(this.state.title, isChecked);

	},

	delete: function(){

		this.props.remover(this.state.title);

	},
	render: function(){

		let title = this.state.title;

	return(<div>
			<input type="checkbox" checked={this.state.checked} onChange={this.toggleChecked}/>
			<label htmlFor="Checkbox">{this.state.title}</label>
			<button type="button" style={{backgroundColor: "red"}} onClick={this.delete}>X</button>
		</div>
		);
	}

	});


module.exports = SubTask;