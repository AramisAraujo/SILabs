package com.example;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface SubtaskRepository extends CrudRepository<Subtask, Long>{
    List<Subtask> findByid(long id);
}
