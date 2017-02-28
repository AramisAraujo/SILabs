package com.example;

public class TaskList {

	private String id;
	private Task[] tasks;

	public TaskList(String id, Task[] tasks) {
		super();
		this.id = id;
		this.tasks = tasks;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Task[] getTasks() {
		return tasks;
	}

	public void setTasks(Task[] tasks) {
		this.tasks = tasks;
	}
	
	@Override
	public String toString() {
		
		return String.format("%s,%s", this.id, this.tasks);
	}

}
