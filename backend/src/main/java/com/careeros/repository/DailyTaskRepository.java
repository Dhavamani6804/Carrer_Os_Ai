package com.careeros.repository;

import com.careeros.entity.DailyTask;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyTaskRepository extends MongoRepository<DailyTask, String> {

    List<DailyTask> findByUserIdAndTaskDateOrderByCreatedAtAsc(
            String userId,
            LocalDate taskDate
    );

}