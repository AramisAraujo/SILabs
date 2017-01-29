var React = require('react');

var CompletionBar = React.createClass({

	render: function() {
		return(
			<div>
			|{this.props.completionRate}|
			</div>
			);
	}
});

module.exports = CompletionBar;