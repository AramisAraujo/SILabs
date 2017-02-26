let React = require('react');

let SubTask = React.createClass({

	getInitialState: function() {

		id = this.props.id;
		checked = this.props.checked;
		title = this.props.title;

		return({
			checked: checked,
			title: title,

		});
	},

    getStatChecked(id){

	    const url = 'http://localhost:8080/getSTcheck?Id='+id;
        checked =jQuery.ajax({ type: "GET", url: url, async: false});

        return checked;
    },

    getStatTitle(id){
      const url = 'http://localhost:8080/getSTtitle?id='+id;
      title = jQuery.ajax({ type: "GET", url: url, async: false});

      return title;
    },

	toggleChecked: function(){

		let isChecked = this.state.checked === true ? false : true;

		this.setState({checked: isChecked});

		this.props.update(this.state.title, isChecked);

	},

	delete: function(){
        const url = 'http://localhost:8080/delST?id='+ this.state.id;

        jQuery.ajax({ type: "GET", url: url, async: false});

		this.props.remover(this.state.id);

	},
	render: function(){

	return(<div>
			<input type="checkbox" checked={this.state.checked} onChange={this.toggleChecked}/>
			<label htmlFor="Checkbox">{this.state.title}</label>
			<button type="button" style={{backgroundColor: "red"}} onClick={this.delete}>X</button>
		</div>
		);
	}

	});


module.exports = SubTask;