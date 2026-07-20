package com.careeros.service.impl;

import com.careeros.dto.response.TaskResponse;
import com.careeros.dto.response.TodayTaskResponse;
import com.careeros.entity.DailyTask;
import com.careeros.entity.User;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.DailyTaskRepository;
import com.careeros.security.CurrentUserService;
import com.careeros.service.DailyTaskService;
import com.careeros.service.StreakService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyTaskServiceImpl implements DailyTaskService {

    private final DailyTaskRepository repository;
    private final CurrentUserService currentUserService;
    private final StreakService streakService;

    @Override
    public TaskResponse createTask(String title) {

        User user = currentUserService.getCurrentUser();

        DailyTask task = DailyTask.builder()

                .userId(user.getId())

                .title(title)

                .completed(false)

                .taskDate(LocalDate.now())

                .createdAt(LocalDateTime.now())

                .updatedAt(LocalDateTime.now())

                .build();

        repository.save(task);

        return map(task);

    }

    @Override
    public TodayTaskResponse getTodayTasks() {

        User user = currentUserService.getCurrentUser();

        streakService.refreshStreak();

        LocalDate today = LocalDate.now();

        List<TaskResponse> responses = new ArrayList<>();

        // Yesterday incomplete tasks
        List<DailyTask> overdueTasks =
                repository.findByUserIdAndCompletedFalseAndTaskDate(
                        user.getId(),
                        today.minusDays(1)
                );

        overdueTasks.forEach(task -> {

            TaskResponse dto = map(task);

            dto.setOverdue(true);

            responses.add(dto);

        });

        // Today's tasks
        List<DailyTask> todayTasks =
                repository.findByUserIdAndTaskDateOrderByCreatedAtAsc(
                        user.getId(),
                        today
                );

        todayTasks.forEach(task -> {

            TaskResponse dto = map(task);

            dto.setOverdue(false);

            responses.add(dto);

        });

        int total = todayTasks.size();

        int completed = (int) todayTasks.stream()
                .filter(DailyTask::isCompleted)
                .count();

        int progress = total == 0
                ? 0
                : (completed * 100) / total;

        return TodayTaskResponse.builder()

                .tasks(responses)

                .totalTasks(total)

                .completedTasks(completed)

                .progress(progress)

                .build();
    }

    @Override
    public TaskResponse moveTaskToToday(String taskId) {

        User user = currentUserService.getCurrentUser();

        DailyTask task = repository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found."));

        if (!task.getUserId().equals(user.getId())) {

            throw new ResourceNotFoundException("Task not found.");

        }

        task.setTaskDate(LocalDate.now());

        task.setUpdatedAt(LocalDateTime.now());

        repository.save(task);

        TaskResponse response = map(task);

        response.setOverdue(false);

        return response;
    }

    @Override
    public TaskResponse toggleTask(String taskId) {

        User user = currentUserService.getCurrentUser();

        DailyTask task = repository.findById(taskId)

                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found."));

        if (!task.getUserId().equals(user.getId())) {

            throw new ResourceNotFoundException("Task not found.");

        }

        task.setCompleted(!task.isCompleted());

        task.setUpdatedAt(LocalDateTime.now());

        repository.save(task);

        streakService.updateStreak();

        return map(task);

    }

    @Override
    public void deleteTask(String taskId) {

        User user = currentUserService.getCurrentUser();

        DailyTask task = repository.findById(taskId)

                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found."));

        if (!task.getUserId().equals(user.getId())) {

            throw new ResourceNotFoundException("Task not found.");

        }

        repository.delete(task);

    }

    private TaskResponse map(DailyTask task) {

        return TaskResponse.builder()

                .id(task.getId())

                .title(task.getTitle())

                .completed(task.isCompleted())

                .taskDate(task.getTaskDate())

                .overdue(false)

                .build();

    }

}