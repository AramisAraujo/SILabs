package com.example;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Subtask implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2608363808719171418L;

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "checked")
	private boolean isChecked;
	
	protected Subtask(){
		
	}

	public Subtask(String title, boolean checked) {
		super();
		this.title = title;
		this.isChecked = checked;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean isChecked() {
		return isChecked;
	}

	public void setChecked(boolean checked) {
		this.isChecked = checked;
	}

}
