var React = require('react');
var Task = React.createClass({

	getInitialState: function () {

		return ({ color: "white" })
	},

		changeColor: function() {

		{this.setState({color : "fuchsia"})};

	},

	render: function () {

		var bgColor = {backgroundColor: this.state.color};

		return(
			<button onClick={this.changeColor} style={bgColor}>
				Whepa!
			</button>);
	}


});

module.exports = Task;