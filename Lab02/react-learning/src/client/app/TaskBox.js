var React = require('react');
var TaskList = require('./TaskList.js');

var TaskBox = React.createClass({

	render: function () {

		return(
		<div>
			<TaskList ref="TaskList"/>

			<form onSubmit={() => this.refs.TaskList.addTask}>

				<input type='text' name='taskName' 
				ref={(task) => this._inputElement = task}></input>

				<p></p>

				<input type='submit' value='Add Task'></input>

				<p></p>

				
 
			</form>

		</div>
			);
	}
});


module.exports = TaskBox;

