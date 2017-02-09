package com.example;

public class Task {
	
	@SuppressWarnings("unused")
	private final String id;
	private String color;
	private String title;
	private String font;
	private boolean completed;
	private String tags[];
	private String priority;
	private String description;
	private Subtask subtasks[];
	
	public Task(String id, String color, String title, String font, boolean completed, String[] tags, String priority,
			String description, Subtask subtasks[]) {
		super();
		this.id = id;
		this.color = color;
		this.title = title;
		this.font = font;
		this.completed = completed;
		this.tags = tags;
		this.priority = priority;
		this.description = description;
		this.subtasks = subtasks;
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

	public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
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

	public Subtask[] getSubtasks() {
		return subtasks;
	}

	public void setSubtasks(Subtask[] subtasks) {
		this.subtasks = subtasks;
	}
	
	
	@Override
	public String toString() {
		return "hey";
	}
	

}
