let React = require('react');
let jQuery = require('jquery');

const host = 'https://mustlisterspring.herokuapp.com';

let SubTask = React.createClass({

	getInitialState: function() {

		let id = this.props.id;
		let checked = this.getStatChecked(id);
		let title = this.getStatTitle(id);

		return({
			id: id,
			checked: checked,
			title: title,

		});
	},

    getStatChecked(id){

	    const url = host+'/getSTChecked?id='+ id;

        let checked = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return JSON.parse(checked);
    },

    getStatTitle(id){
      const url = host + '/getSTTitle?id='+ id;
      let title = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

      return title;
    },

	toggleChecked: function(){

		let isChecked = this.state.checked === true ? false : true;

        let url = host + '/changeSTChecked?id='+ this.state.id;

        url = url + '&checked=' + isChecked;

        jQuery.ajax({ type: "GET", url: url, async: false});

		this.setState({checked: isChecked});

	},

	delete: function(){

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