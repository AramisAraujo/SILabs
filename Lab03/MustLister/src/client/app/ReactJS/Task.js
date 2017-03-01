
let React = require('react');
let FontPicker = require('react-font-picker');
let SubTask = require('./SubTask.js');
let jQuery = require('jquery');

const host = 'https://mustlisterspring.herokuapp.com';

let Task = React.createClass({

	getInitialState: function () {
        let id = this.props.taskID;

        let tags = this.loadTags(id);
        let color = this.loadColor(id);
        let title = this.loadTitle(id);
        let font = this.loadFont(id);
        let subtasks = this.loadSubtaskList(id);
        let completed = this.loadCompletion(id);
        let description = this.loadDesc(id);
        let priority = this.loadPriority(id);

		return ({color: color, title: title,
		font: font, id: id, completed: completed,
		tags: tags, priority: priority,
		description: description, subtasks: subtasks})
	},

    loadTags(id){

	    const url = host + '/getTaskTags?id='+ id;

        let tags = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return JSON.parse(tags);
    },

    loadColor(id){

        const url = host + '/getTaskColor?id='+ id;

        let color = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return color;
    },

    loadTitle(id){

        const url = host + '/getTaskTitle?id='+ id;

        let title = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return title;
    },

    loadFont(id){

        const url = host + '/getTaskFont?id='+ id;

        let font = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return font;
    },
    loadSubtaskList(id){

        const url = host + '/getTaskSTList?id='+ id;

        let subtasks = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return JSON.parse(subtasks);
    },
    loadCompletion(id){

        const url = host + '/getTaskCompletion?id='+ id;

        let completion = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return JSON.parse(completion);
    },
    loadDesc(id){

        const url = host + '/getTaskDesc?id='+ id;

        let desc = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return desc;
    },
    loadPriority(id){

        const url = host + '/getTaskPrio?id='+ id;

        let priority = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

        return priority;
    },

	removeTask: function(submitEvent) {

		submitEvent.preventDefault();//Overrides default submit event
		this.props.remover(this.state.id);

	},

	toggleComplete: function (toggleEvent) {

		toggleEvent.preventDefault();//Overrides default toggle event

		let completed = this.state.completed ===
				true ? false : true;

        let url = host + '/changeTaskCompletion?id='+ this.state.id;

        url = url +'&completed=' + completed;
        jQuery.ajax({ type: "GET", url: url, async: false});

        this.props.updateCompletion();
        this.setState({completed: completed});
    },

	changeColor: function(newColor) {

		this.setState({color: newColor.hex});

        let url = host + '/changeTaskColor?id='+ this.state.id;
        url = url +'&color=' + newColor.hex;

        jQuery.ajax({ type: "GET", url: url, async: false});
	},

	changeFont: function(newFont) {

		this.setState({font: newFont});

        let url = host + '/changeTaskFont?id='+ this.state.id;
        url = url +'&font=' + newFont;

        jQuery.ajax({ type: "GET", url: url, async: false});

	},

	addTag: function(){

		let tagTitle = prompt("Insert new Tag:","Your Tag Here");

		if(tagTitle.trim() != '' && !this.state.tags.includes(tagTitle)){

			let tags = this.state.tags;

			tags.push(tagTitle);

			this.setState({tags:tags});

            let url = host + '/addTaskTag?id='+ this.state.id;
            url = url +'&tag=' + tagTitle;

            jQuery.ajax({ type: "GET", url: url, async: false});
		}


	},

	setPriority: function(newPriority){

		let priorities = ["low","medium","high"];

		newPriority = newPriority.toLowerCase().trim();

		if(priorities.includes(newPriority)){

			let color = this.getPriorityColor(newPriority);

            let url = host + '/changeTaskPrio?id='+ this.state.id;
            url = url +'&prio=' + newPriority;

            jQuery.ajax({ type: "GET", url: url, async: false});

			this.setState({priority: newPriority, color:color});
		}


	},

	togglePriority: function(){

		let newPriority;
		let actualPriority = this.state.priority;

		if(actualPriority == "low"){
			newPriority = "medium";
		}
		else if(actualPriority == "medium"){
			newPriority = "high";
		}
		else if (actualPriority == "high"){
			newPriority = "low";
		}

		this.setPriority(newPriority);


	},

	setDescription: function(descInputEvent){

		let description = this.refs.description.value;

		description = description.trim();

		if(description != "" && description != this.state.description){

			this.setState({description:description});
			this.refs.description.value = description;

            let url = host + '/changeTaskDesc?id='+ this.state.id;
            url = url +'&desc=' + description;

            jQuery.ajax({ type: "GET", url: url, async: false});
		}

	},

	addSubtask: function(){

		let title = prompt("Insert new SubTask Title:","SubTask Title");


        let url = host + '/createST?title='+ title;

        url = url + '&taskId=' + this.state.id;

        let stId = jQuery.ajax({ type: "GET", url: url, async: false}).responseText;

		let subtasksIdList = this.state.subtasks;

		subtasksIdList = subtasksIdList.concat(stId);

		this.setState({subtasks: subtasksIdList});
	},

	removeSubtask: function(subtaskID){

		let subtasks = this.state.subtasks.filter(function(id){
			return id != subtaskID;
		});

        const url = host + '/delST?id='+ subtaskID;

        jQuery.ajax({ type: "GET", url: url, async: false});

        this.setState({subtasks:subtasks});
    },

	renderSubtasks: function(){

		if(this.state.subtasks == undefined){
			return;
		}

        let urlGetTitle = host + '/getSTTitle?id=';
        let urlGetChecked = host + '/getSTChecked?id=';

		let subtasksToRender = this.state.subtasks.map(function (subtaskID){

		    let urlTitle = urlGetTitle+subtaskID;
		    let urlChecked = urlGetChecked+subtaskID

            let checked = jQuery.ajax({ type: "GET", url: urlChecked, async: false}).responseText;

		    checked = JSON.parse(checked);

		    let title = jQuery.ajax({ type: "GET", url: urlTitle, async: false}).responseText;


			return(<SubTask key={subtaskID} id={subtaskID} remover={this.removeSubtask}/>);

		}, this);

		return subtasksToRender;
	},

	getPriorityColor: function(priority){

		if(priority == "low"){
			return "blue";
		}
		else if(priority == "medium"){
			return "orange";
		}
		else{
			return "red";
		}
	},

	removeTag: function(){
		let tagToRemove = prompt("Input tag for removal","Tag to Remove");
		let tags = this.state.tags;

		tags = tags.filter(function (tagTitle){

			return tagTitle.toLowerCase() != tagToRemove.toLowerCase();

		});

        let url = host + '/delTaskTag?id='+ this.state.id;

        url = url +'&tag=' + tagToRemove;
        jQuery.ajax({ type: "GET", url: url, async: false});

        this.setState({tags:tags});
    },


	render: function () {

		let style = {color:this.state.color, fontFamily:this.state.font,backgroundColor: "transparent"};

		if(this.state.completed == true){

		    style = {color:this.state.color, fontFamily:this.state.font,backgroundColor: "gold"};

		}

		return(


			<div className="myBoxTask" onDoubleClick={this.togglePriority}>

				<h2 style={style}>
					{this.state.title}
				</h2>
				{/*
				<h1>
					Pick a Color!
					<CirclePicker color={this.state.color} 
					onChangeComplete={this.changeColor}></CirclePicker>
				</h1>

				<h1>
					Pick a cool Font!
					<FontPicker label={this.state.font}  previews={false}
        			activeColor="#64B5F6" onChange={this.changeFont}/>
        		</h1>
				*/}
				<div >
        			<input className="descBox" type="text" placeholder={this.state.description} onBlur={this.setDescription} ref="description"/>
        		</div>
				<button type="button" style={{backgroundColor: "limegreen"}} 
				 onClick={this.toggleComplete}>&#x2713;</button>

				<a type="button" className="close-ribbon" onClick={this.removeTask}>&times;</a>
				<div>
					Subtasks:{this.renderSubtasks()}
					<button type="button" style={{backgroundColor: "orange"}} 
				 onClick={this.addSubtask}>+</button>
				</div>
				<div>
					Tags:{this.state.tags.toString()}
					<button type="button" style={{backgroundColor: "violet"}} 
				 onClick={this.addTag}>+</button>
				 <button type="button" style={{backgroundColor: "#737CEE"}}
				  onClick={this.removeTag}>Remove Tag</button>
				</div>
			</div>
				);}


});

module.exports = Task;