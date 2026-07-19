package com.careeros.service;

import com.careeros.dto.response.TaskResponse;
import com.careeros.dto.response.TodayTaskResponse;

public interface DailyTaskService {

    TaskResponse createTask(String title);

    TodayTaskResponse getTodayTasks();

    TaskResponse toggleTask(String taskId);

    void deleteTask(String taskId);



}