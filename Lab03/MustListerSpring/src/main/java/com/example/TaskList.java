package com.example;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class TaskList implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4900109026264138579L;

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private String title;
	
	@OneToMany(targetEntity=Task.class)
	private List<Task> tasks;

	public TaskList(String title, List<Task> tasks) {
		super();
		this.title = title;
		this.tasks = tasks;
	}
	
	protected TaskList(){
		
	}

	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
	
	@Override
	public String toString() {
		
		return String.format("%s,%s", this.id, this.tasks);
	}

}
