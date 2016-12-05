var React = require('react');

var Task = React.createClass({

	getInitialState: function () {

		return ({ color: "white", title: "" })
	},

	changeColor: function() {

		{this.setState({color : "fuchsia"})};

	},

	render: function () {

		var bgColor = {backgroundColor: this.state.color};

		return(
			<div>
				<h1>
					{this.state.title}
				</h1>
				<button onClick={this.changeColor} style={bgColor}>
					Pinkify
				</button>
			</div>
				);}


});

module.exports = Task;