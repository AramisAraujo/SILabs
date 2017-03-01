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
import com.google.gson.Gson;

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
	@RequestMapping("/initialList")
	public void createInitialProps(){
		
		Subtask st = new Subtask("Study Math", false);
		subTaskRepo.save(st);
		
		List<Subtask> stL = new ArrayList<Subtask>();
		stL.add(st);
		
		List<String> empty = new ArrayList<String>();
		
		Task t1= new Task("Red", "Have some fun", "Arial", false, empty, "high", "", stL);
		Task t2 = new Task("Orange", "Make some neat CSS", "Arial", false, empty, "medium", "", null);
		Task t3 = new Task("Blue", "Study some more", "Arial", false, empty, "low", "", null);
		
		taskRepo.save(t1);
		taskRepo.save(t2);
		taskRepo.save(t3);

		List<Task>tl = new ArrayList<Task>();
		
		tl.add(t1);
		tl.add(t2);
		tl.add(t3);
		
		TaskList taskL = new TaskList("My First TaskList", tl);
		
		taskListRepo.save(taskL);
		
	}
	
	@CrossOrigin
	@RequestMapping("/getListToDownload")
	public String createListJson(@RequestParam(value = "id") long id){
		
		TaskList list = taskListRepo.findByid(id).get(0);
		
		Gson gson = new Gson();
		
		return new Gson().toJson(list);
		
	}
	
	@CrossOrigin
	@RequestMapping("/testPSQL")
	public void testCreateList() {

		Subtask subT = new Subtask("Do Something", false);

		subTaskRepo.save(subT);
		long id = subT.getId();

		System.out.println(id);
		System.out.println(subTaskRepo.findByid(id).get(0).getTitle());

	}

	@CrossOrigin
	@RequestMapping("/getSTTitle")
	public String getSubtaskTitle(@RequestParam(value = "id") long id) {
		Subtask foundSTask = subTaskRepo.findByid(id).get(0);

		return new Gson().toJson(foundSTask.getTitle());
	}

	@CrossOrigin
	@RequestMapping("/getSTChecked")
	public String getSubtaskChecked(@RequestParam(value = "id") long id) {

		Subtask foundSTask = subTaskRepo.findByid(id).get(0);

		return new Gson().toJson(foundSTask.isChecked());
	}

	@CrossOrigin
	@RequestMapping("/changeSTChecked")
	public void changeSubtaskChecked(@RequestParam(value = "id") long id,
			@RequestParam(value = "checked") boolean checked) {

		Subtask foundSTask = subTaskRepo.findByid(id).get(0);

		foundSTask.setChecked(checked);

		subTaskRepo.save(foundSTask);
	}

	@CrossOrigin
	@RequestMapping("/getTaskColor")
	public String getTaskColor(@RequestParam(value = "id") long id) {
		Task foundTask = taskRepo.findByid(id).get(0);

		return foundTask.getColor();
	}

	@CrossOrigin
	@RequestMapping("/getTaskSTList")
	public String getTaskSTList(@RequestParam(value = "id") long id) {
		Task foundTask = taskRepo.findByid(id).get(0);
		List<Subtask> stList = foundTask.getSubtasks();

		List<Long> stIds = new ArrayList<Long>();

		for (Subtask subtask : stList) {

			stIds.add(subtask.getId());
		}

		return new Gson().toJson(stIds);
	}

	@CrossOrigin
	@RequestMapping("/getTaskCompletion")
	public String getTaskCompletion(@RequestParam(value = "id") long id) {
		Task foundTask = taskRepo.findByid(id).get(0);

		return new Gson().toJson(foundTask.isCompleted());
	}

	@CrossOrigin
	@RequestMapping("/getTaskTitle")
	public String getTaskTitle(@RequestParam(value = "id") long id) {
		Task foundTask = taskRepo.findByid(id).get(0);

		return foundTask.getTitle();
	}

	@CrossOrigin
	@RequestMapping("/getTaskDesc")
	public String getTaskDesc(@RequestParam(value = "id") long id) {
		Task foundTask = taskRepo.findByid(id).get(0);

		return foundTask.getDescription();
	}

	@CrossOrigin
	@RequestMapping("/getTaskPrio")
	public String getTaskPriority(@RequestParam(value = "id") long id) {
		Task foundTask = taskRepo.findByid(id).get(0);

		return foundTask.getPriority();
	}

	@CrossOrigin
	@RequestMapping("/getTaskFont")
	public String getTaskFont(@RequestParam(value = "id") long id) {
		Task foundTask = taskRepo.findByid(id).get(0);

		return foundTask.getFont();
	}

	@CrossOrigin
	@RequestMapping("/getTaskTags")
	public String getTaskTags(@RequestParam(value = "id") long id) {
		Task foundTask = taskRepo.findByid(id).get(0);

		return new Gson().toJson(foundTask.getTags());
	}

	@CrossOrigin
	@RequestMapping("/delTask")
	public void deleteTask(@RequestParam(value = "id") long id) {
		Task foundTask = taskRepo.findByid(id).get(0);

		taskRepo.delete(foundTask);
	}

	@CrossOrigin
	@RequestMapping("/changeTaskColor")
	public void changeTaskColor(@RequestParam(value = "id") long id, @RequestParam(value = "color") String color) {

		Task foundTask = taskRepo.findByid(id).get(0);

		foundTask.setColor(color);

		taskRepo.save(foundTask);
	}

	@CrossOrigin
	@RequestMapping("/changeTaskFont")
	public void changeTaskFont(@RequestParam(value = "id") long id, @RequestParam(value = "font") String font) {

		Task foundTask = taskRepo.findByid(id).get(0);

		foundTask.setFont(font);

		taskRepo.save(foundTask);
	}

	@CrossOrigin
	@RequestMapping("/addTaskTag")
	public void addTaskTag(@RequestParam(value = "id") long id, @RequestParam(value = "tag") String tag) {

		Task foundTask = taskRepo.findByid(id).get(0);

		List<String> tags = foundTask.getTags();

		tags.add(tag);

		taskRepo.save(foundTask);
	}

	@CrossOrigin
	@RequestMapping("/delTaskTag")
	public void delTaskTag(@RequestParam(value = "id") long id, @RequestParam(value = "tag") String tag) {

		Task foundTask = taskRepo.findByid(id).get(0);

		List<String> tags = foundTask.getTags();

		tags.remove(tag);

		taskRepo.save(foundTask);
	}

	@CrossOrigin
	@RequestMapping("/changeTaskPrio")
	public void changeTaskPrio(@RequestParam(value = "id") long id, @RequestParam(value = "prio") String priority) {

		Task foundTask = taskRepo.findByid(id).get(0);

		foundTask.setPriority(priority);

		if (priority.equals("low")) {
			foundTask.setColor("Blue");
		} else if (priority.equals("medium")) {
			foundTask.setColor("Orange");
		} else if (priority.equals("high")) {
			foundTask.setColor("Red");
		}

		taskRepo.save(foundTask);
	}

	@CrossOrigin
	@RequestMapping("/changeTaskDesc")
	public void changeTaskDesc(@RequestParam(value = "id") long id, @RequestParam(value = "desc") String description) {

		Task foundTask = taskRepo.findByid(id).get(0);

		foundTask.setDescription(description);

		taskRepo.save(foundTask);
	}

	@CrossOrigin
	@RequestMapping("/changeTaskCompletion")
	public void changeTaskCompletion(@RequestParam(value = "id") long id,
			@RequestParam(value = "completed") boolean completed) {
		Task foundTask = taskRepo.findByid(id).get(0);

		foundTask.setCompleted(completed);

		taskRepo.save(foundTask);

	}

	@CrossOrigin
	@RequestMapping("/createST")
	public String createSubtask(@RequestParam(value = "title") String title,
			@RequestParam(value = "taskId") long taskId) {

		Subtask newSubtask = new Subtask(title, false);

		subTaskRepo.save(newSubtask);

		Task foundTask = taskRepo.findByid(taskId).get(0);

		foundTask.getSubtasks().add(newSubtask);

		taskRepo.save(foundTask);

		return new Gson().toJson(newSubtask.getId());

	}

	@CrossOrigin
	@RequestMapping("/delST")
	public void deleteSubtask(@RequestParam(value = "id") long id) {

		Task itsTask;

		Subtask foundSubtask = this.subTaskRepo.findByid(id).get(0);

		for (Task task : taskRepo.findAll()) {

			if (task.getSubtasks().contains(foundSubtask)) {
				itsTask = task;
				itsTask.getSubtasks().remove(foundSubtask);
				taskRepo.save(itsTask);
				break;
			}

		}

		subTaskRepo.delete(foundSubtask);

	}

	@CrossOrigin
	@RequestMapping("/removeTask")
	public void removeTask(@RequestParam(value = "id") long id, @RequestParam(value = "taskId") long taskId) {

		Task foundTask = this.taskRepo.findByid(taskId).get(0);

		TaskList foundTaskList = this.taskListRepo.findByid(id).get(0);

		foundTaskList.getTasks().remove(foundTask);

		taskRepo.delete(foundTask);

		taskListRepo.save(foundTaskList);

	}

	@CrossOrigin
	@RequestMapping("/createTask")
	public String createTask(@RequestParam(value = "title") String title, @RequestParam(value = "listId") long listId) {

		TaskList taskList = taskListRepo.findByid(listId).get(0);

		List<Subtask> subtasks = new ArrayList<Subtask>();

		List<String> tags = new ArrayList<String>();

		Task newTask = new Task("Blue", title, "Arial", false, tags, "low", "", subtasks);

		this.taskRepo.save(newTask);

		taskList.getTasks().add(newTask);

		taskListRepo.save(taskList);

		return new Gson().toJson(newTask.getId());

	}

	@CrossOrigin
	@RequestMapping("/getTaskList")
	public String getList(@RequestParam(value = "id") String id) {

		return readTaskList(id);

	}

	@CrossOrigin
	@RequestMapping("/getTLTitle")
	public String getTaskListTitle(@RequestParam(value = "id") long id) {

		TaskList found = taskListRepo.findByid(id).get(0);

		return found.getTitle();
	}

	@CrossOrigin
	@RequestMapping("/changeTLTitle")
	public void getTaskListTitle(@RequestParam(value = "id") long id, @RequestParam(value = "title") String title) {

		TaskList found = taskListRepo.findByid(id).get(0);

		found.setTitle(title);

		taskListRepo.save(found);

	}

	@CrossOrigin
	@RequestMapping("/getTLTasksID")
	public String getTLTaskIds(@RequestParam(value = "id") long id) {

		List<Long> taskIds = new ArrayList<Long>();

		TaskList taskList = taskListRepo.findByid(id).get(0);

		for (Task task : taskList.getTasks()) {

			taskIds.add(task.getId());

		}
		String opa = new Gson().toJson(taskIds);

		return opa;

	}

	@CrossOrigin
	@RequestMapping("/getListsID")
	public String getListsID() {

		List<Long> ids = new ArrayList<Long>();

		List<TaskList> taskLists = (List<TaskList>) taskListRepo.findAll();

		for (TaskList taskList : taskLists) {

			ids.add(taskList.getId());

		}

		return new Gson().toJson(ids);

	}

	@CrossOrigin
	@RequestMapping("/deleteList")
	public void deleteList(@RequestParam(value = "id") long id) {

		TaskList toRemove = taskListRepo.findByid(id).get(0);

		taskListRepo.delete(toRemove);
	}

	@CrossOrigin
	@RequestMapping("/getCompletionRate")
	public String getCompletionRatio() {

		List<Task> allTasks = (List<Task>) taskRepo.findAll();

		double amount = allTasks.size();

		double completed = 0;

		for (Task task : allTasks) {

			if (task.isCompleted()) {
				completed++;
			}

		}

		if (amount == 0) {

			return new Gson().toJson(amount);
		}

		return new Gson().toJson(completed / amount);

	}

	@CrossOrigin
	@RequestMapping(value = "/createNewList")
	public void createNewList(@RequestParam(value = "title") String title) {

		List<Task> itsList = new ArrayList<Task>();

		TaskList newOne = new TaskList(title, itsList);

		taskListRepo.save(newOne);
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
