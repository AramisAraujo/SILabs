
var React = require('react');
var TaskList = require('./TaskList.js');

var TaskBox = React.createClass({


	render: function () {

		return(
		
		<div className="myBox">
			<div className="pure-u-1-3">
				<h1>This is the TO DO box!</h1>

				<TaskList/>

			</div>
		</div>
			);
	}
});




module.exports = TaskBox;

