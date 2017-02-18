package com.example;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface TaskListRepository extends CrudRepository<TaskList, Long>{
	
	List<TaskList> findByid(long id);

}
