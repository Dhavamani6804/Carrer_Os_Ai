package com.careeros.controller;

import com.careeros.dto.request.CreateTaskRequest;
import com.careeros.dto.response.ApiResponse;
import com.careeros.dto.response.TaskResponse;
import com.careeros.dto.response.TodayTaskResponse;
import com.careeros.service.DailyTaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class DailyTaskController {

    private final DailyTaskService dailyTaskService;

    /*
     * Create Task
     */

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(

            @Valid
            @RequestBody
            CreateTaskRequest request

    ) {

        TaskResponse response =
                dailyTaskService.createTask(request.getTitle());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);

    }

    /*
     * Get Today's Tasks
     */

    @GetMapping("/today")
    public ResponseEntity<TodayTaskResponse> getTodayTasks() {

        return ResponseEntity.ok(
                dailyTaskService.getTodayTasks()
        );

    }

    /*
     * Toggle Task
     */

    @PatchMapping("/{taskId}/toggle")
    public ResponseEntity<TaskResponse> toggleTask(

            @PathVariable
            String taskId

    ) {

        return ResponseEntity.ok(
                dailyTaskService.toggleTask(taskId)
        );

    }

    /*
     * Delete Task
     */

    @DeleteMapping("/{taskId}")
    public ResponseEntity<ApiResponse> deleteTask(

            @PathVariable
            String taskId

    ) {

        dailyTaskService.deleteTask(taskId);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Task deleted successfully."
                )
        );

    }

}