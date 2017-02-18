package com.example;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Task implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5263039426747289247L;

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy=GenerationType.AUTO) 
	private long id;
	
	private String color;
	private String title;
	private String font;
	private boolean completed;
	
	@ElementCollection
	private List<String> tags;
	
	private String priority;
	private String description;
	
	@OneToMany(targetEntity=Subtask.class)
	private List<Subtask> subtasks;
	

	public Task(String color, String title, String font, boolean completed, List<String> tags, String priority,
			String description, List<Subtask> subtasks) {
		super();
		this.color = color;
		this.title = title;
		this.font = font;
		this.completed = completed;
		this.tags = tags;
		this.priority = priority;
		this.description = description;
		this.subtasks = subtasks;
	}
	
	protected Task(){
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFont() {
		return font;
	}

	public void setFont(String font) {
		this.font = font;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Subtask> getSubtasks() {
		return subtasks;
	}

	public void setSubtasks(List<Subtask> subtasks) {
		this.subtasks = subtasks;
	}

	


}
