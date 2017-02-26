package com.example;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;

@RestController
public class Controller {
	
	@Autowired
	SubtaskRepository subTaskRepo;
	
	@Autowired
	TaskRepository taskRepo;
	
	@Autowired
	TaskListRepository taskListRepo;

	private final String TASK_LIST_PATH_SAMPLE = "taskList";
	private final String JSON_EXTENSION = ".json";

	@CrossOrigin
	@RequestMapping("/testPSQL")
	public void testCreateList() {
		
		Subtask subT = new Subtask("Do Something", false);
		
		
		subTaskRepo.save(subT);
		long id = subT.getId();

		System.out.println(id);
		System.out.println(subTaskRepo.findByid(id).get(0).getTitle());
		
		
		return;
//		Subtask subT = new Subtask("Do Something", false);
//		
//		subTaskRepo.save(subT);
//		System.out.println("Subtask Salva!");
//
//		List<Subtask> stList = new ArrayList<Subtask>();
//		stList.add(subT);
//
//		List<String> tags = new ArrayList<String>();
//		
//		tags.add("Urgente");
//		tags.add("Importante");
//				
//		Task aTask = new Task("", "My first Task", "", false, tags, "low", "a task", stList);
//		
//		taskRepo.save(aTask);
//		
//		System.out.println("Task Salva!");
//
//		List<Task> taskList = new ArrayList<Task>();
//
//		taskList.add(aTask);
//
//		taskListRepo.save(new TaskList("My List",taskList));
//		
//
//		System.out.println("Lista criada !");
		
	}
	
	@CrossOrigin
	@RequestMapping("/getSTTitle")
	public String getSubtaskTitle(@RequestParam(value = "id") long id){
		Subtask foundSTask = subTaskRepo.findByid(id).get(0);
		
		return foundSTask.getTitle();
	}
	
	@CrossOrigin
	@RequestMapping("/getTaskColor")
	public String getTaskColor(@RequestParam(value = "id") long id){
		Task foundTask = taskRepo.findByid(id).get(0);
		
		return foundTask.getColor();
	}
	@CrossOrigin
	@RequestMapping("/getTaskSTList")
	public List<Long> getTaskSTList(@RequestParam(value = "id") long id){
		Task foundTask = taskRepo.findByid(id).get(0);
		List<Subtask> stList = foundTask.getSubtasks();
		
		List<Long> stIds = new ArrayList<Long>();
		
		for (Subtask subtask : stList) {
			
			stIds.add(subtask.getId());
		}
		
		return stIds;
	}
	@CrossOrigin
	@RequestMapping("/getTaskCompletion")
	public boolean getTaskCompletion(@RequestParam(value = "id") long id){
		Task foundTask = taskRepo.findByid(id).get(0);
		
		return foundTask.isCompleted();
	}
	@CrossOrigin
	@RequestMapping("/getTaskTitle")
	public String getTaskTitle(@RequestParam(value = "id") long id){
		Task foundTask = taskRepo.findByid(id).get(0);
		
		return foundTask.getTitle();
	}
	@CrossOrigin
	@RequestMapping("/getTaskDesc")
	public String getTaskDesc(@RequestParam(value = "id") long id){
		Task foundTask = taskRepo.findByid(id).get(0);
		
		return foundTask.getDescription();
	}
	@CrossOrigin
	@RequestMapping("/getTaskPrio")
	public String getTaskPriority(@RequestParam(value = "id") long id){
		Task foundTask = taskRepo.findByid(id).get(0);
		
		return foundTask.getPriority();
	}
	@CrossOrigin
	@RequestMapping("/getTaskFont")
	public String getTaskFont(@RequestParam(value = "id") long id){
		Task foundTask = taskRepo.findByid(id).get(0);
		
		return foundTask.getFont();
	}	
	
	@CrossOrigin
	@RequestMapping("/getTaskTags")
	public List<String> getTaskTags(@RequestParam(value = "id") long id){
		Task foundTask = taskRepo.findByid(id).get(0);
		
		return foundTask.getTags();
	}
	
	@CrossOrigin
	@RequestMapping("/delTask")
	public void deleteTask(@RequestParam(value = "id") long id){
		Task foundTask = taskRepo.findByid(id).get(0);
		
		taskRepo.delete(foundTask);
	}
	
	@CrossOrigin
	@RequestMapping("/changeTaskCompletion")
	public void changeTaskCompletion(@RequestParam(value = "id") long id,
			@RequestParam(value = "completed") boolean completed){
		Task foundTask = taskRepo.findByid(id).get(0);
		
		foundTask.setCompleted(completed);
		
		taskRepo.save(foundTask);
		
	}

	@CrossOrigin
	@RequestMapping("/getTaskList")
	public String getList(@RequestParam(value = "id") String id) {

		return readTaskList(id);

	}
	
	@CrossOrigin
	@RequestMapping("/getTLTitle")
	public String getTaskListTitle(@RequestParam(value = "id") long id){
		
		TaskList found = taskListRepo.findByid(id).get(0);
		
		return found.getTitle();
	}
	
	@CrossOrigin
	@RequestMapping("/getTLTasksID")
	public List<Long> getTLTaskIds(@RequestParam(value = "id") long id){
		
		List<Long> taskIds = new ArrayList<Long>();
		
		TaskList taskList = taskListRepo.findByid(id).get(0);
		
		for (Task task : taskList.getTasks()) {
			
			taskIds.add(task.getId());
			
		}
		
		return taskIds;
		
	}

	@CrossOrigin
	@RequestMapping("/getListsID")
	public List<String> getListsID() {

		List<String> ids = new ArrayList<String>();

		File folder = new File("./");
		File[] listOfFiles = folder.listFiles();

		for (File file : listOfFiles) {
			if (file.getName().contains("taskList")) {
				String listID = file.getName().replaceAll("taskList", "");
				listID = listID.replaceAll(".json", "");
				ids.add(listID);
			}
		}

		return ids;

	}

	@CrossOrigin
	@RequestMapping("/deleteList")
	public void deleteList(@RequestParam(value = "id") String id) {

		String path = this.getPathToList(id);

		File toDelete = new File(path);

		toDelete.delete();

		System.out.println("Deleted file " + path);

	}

	@CrossOrigin
	@RequestMapping(value = "/createNewList", method = RequestMethod.POST)
	public void createNewList(@RequestBody Map<String, Object> stuff) throws ParseException, JsonProcessingException {

		String param = new ObjectMapper().writeValueAsString(stuff);

		String id = (String) stuff.get("id");

		String title = (String) stuff.get("title");

		String emptyList = String.format("{'id':'%s','title':'%s', 'data':''}", id, title);

		emptyList = emptyList.replaceAll("'", "\"");

		@SuppressWarnings("deprecation")
		JSONParser parser = new JSONParser();

		JSONObject empty = (JSONObject) parser.parse(emptyList);

		this.writeJson(id, empty);

	}

	@CrossOrigin
	@RequestMapping(value = "/saveList", method = RequestMethod.POST)
	public void saveTaskList(@RequestBody Map<String, Object> listData) throws ParseException, JsonProcessingException {

		String param = new ObjectMapper().writeValueAsString(listData);
		String id = (String) listData.get("id");

		@SuppressWarnings("deprecation")
		JSONParser parser = new JSONParser();

		JSONObject list = (JSONObject) parser.parse(param);

		this.writeJson(id, list);
		System.out.println("wrote by id " + id);
	}

	private String readTaskList(String id) {

		final String pathToJson = getPathToList(id);

		@SuppressWarnings("deprecation")
		JSONParser parser = new JSONParser();

		try {

			Object obj = parser.parse(new FileReader(pathToJson));

			JSONObject jsonObject = (JSONObject) obj;

			String rep = jsonObject.toJSONString();

			if (rep.equals("{}")) {
				return "";
			}
			return rep;

		} catch (FileNotFoundException e) {
			return "";
		} catch (Exception e) {
			e.printStackTrace();
		}

		return "";

	}

	@CrossOrigin
	@RequestMapping(value = "/updateTaskList", method = RequestMethod.POST)
	public void updateTask(@RequestBody Map<String, Object> taskData) throws JsonProcessingException {

		String taskListJsonString = new ObjectMapper().writeValueAsString(taskData);

		String id = (String) taskData.get("id");

		JSONObject json = this.parseToJSON(taskListJsonString);

		writeJson(id, json);

	}

	private JSONObject parseToJSON(String jsonString) {

		@SuppressWarnings("deprecation")
		JSONParser parser = new JSONParser();

		try {

			Object obj = parser.parse(jsonString);

			JSONObject jsonObject = (JSONObject) obj;

			return jsonObject;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	private String getPathToList(String id) {
		String path = this.TASK_LIST_PATH_SAMPLE + id + this.JSON_EXTENSION;

		return path;
	}

	private void writeJson(String id, JSONObject json) {

		try (FileWriter file = new FileWriter(getPathToList(id))) {

			System.out.println("Escrevendo taskList " + id);

			file.write(json.toJSONString());
			file.flush();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
