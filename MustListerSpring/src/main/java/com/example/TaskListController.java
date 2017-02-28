package com.example;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

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
public class TaskListController {

	private final String TASK_LIST_PATH_SAMPLE = "taskList";
	private final String JSON_EXTENSION = ".json";

	@CrossOrigin
	@RequestMapping("/getTaskList")
	public String getList(@RequestParam(value = "id") String id) {

		return readTaskList(id);

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
	public void deleteList(@RequestParam(value = "id") String id){
		
		String path = this.getPathToList(id);
		
		File toDelete = new File(path);
		
		toDelete.delete();
		
		System.out.println("Deleted file "+path);
		
	}

	@CrossOrigin
	@RequestMapping(value = "/createNewList", method = RequestMethod.POST)
	public void createNewList(@RequestBody Map<String, Object> stuff) throws ParseException, JsonProcessingException {
		
		String param = new ObjectMapper().writeValueAsString(stuff);

		String id = (String) stuff.get("id");
		
		String title = (String) stuff.get("title");
		
		String emptyList = String.format("{'id':'%s','title':'%s', 'data':''}", id,title);
		
		emptyList = emptyList.replaceAll("'", "\"");
		
		@SuppressWarnings("deprecation")
		JSONParser parser = new JSONParser();

		JSONObject empty = (JSONObject) parser.parse(emptyList);

		this.writeJson(id, empty);

	}
	
	@CrossOrigin
	@RequestMapping(value = "/saveList", method = RequestMethod.POST)
	public void saveTaskList(@RequestBody Map<String, Object> listData) throws ParseException, JsonProcessingException{
		
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

			if(rep.equals("{}")){
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
