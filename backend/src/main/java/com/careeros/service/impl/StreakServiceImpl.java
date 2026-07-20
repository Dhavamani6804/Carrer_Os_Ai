package com.careeros.service.impl;

import com.careeros.entity.DailyTask;
import com.careeros.entity.User;
import com.careeros.repository.DailyTaskRepository;
import com.careeros.repository.UserRepository;
import com.careeros.security.CurrentUserService;
import com.careeros.service.StreakService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StreakServiceImpl implements StreakService {

    private final UserRepository userRepository;
    private final DailyTaskRepository taskRepository;
    private final CurrentUserService currentUserService;

    @Override
    public void updateStreak() {

        User user = currentUserService.getCurrentUser();

        LocalDate today = LocalDate.now();

        List<DailyTask> todayTasks =
                taskRepository.findByUserIdAndTaskDateOrderByCreatedAtAsc(
                        user.getId(),
                        today
                );

        // No tasks -> nothing to update
        if (todayTasks.isEmpty()) {
            return;
        }

        boolean allCompleted = todayTasks.stream()
                .allMatch(DailyTask::isCompleted);

        if (!allCompleted) {
            return;
        }

        // Already updated today
        if (today.equals(user.getLastCompletedDate())) {
            return;
        }

        if (today.minusDays(1).equals(user.getLastCompletedDate())) {
            user.setCurrentStreak(user.getCurrentStreak() + 1);
        } else {
            user.setCurrentStreak(1);
        }

        if (user.getCurrentStreak() > user.getBestStreak()) {
            user.setBestStreak(user.getCurrentStreak());
        }

        user.setLastCompletedDate(today);

        userRepository.save(user);
    }

    @Override
    public void refreshStreak() {

        User user = currentUserService.getCurrentUser();

        LocalDate today = LocalDate.now();

        cleanupExpiredOverdue(user.getId(), today);

        LocalDate yesterday = today.minusDays(1);

        List<DailyTask> yesterdayTasks =
                taskRepository.findByUserIdAndTaskDateOrderByCreatedAtAsc(
                        user.getId(),
                        yesterday
                );

        if (yesterdayTasks.isEmpty()) {
            return;
        }

        boolean allCompleted = yesterdayTasks.stream()
                .allMatch(DailyTask::isCompleted);

        if (!allCompleted) {

            user.setCurrentStreak(0);

            userRepository.save(user);
        }
    }

    private void cleanupExpiredOverdue(String userId,
                                       LocalDate today) {

        List<DailyTask> oldTasks =
                taskRepository.findByUserIdAndTaskDateBeforeOrderByTaskDateAscCreatedAtAsc(
                        userId,
                        today.minusDays(1)
                );

        List<DailyTask> deleteTasks = oldTasks.stream()
                .filter(task -> !task.isCompleted())
                .toList();

        if (!deleteTasks.isEmpty()) {

            taskRepository.deleteAll(deleteTasks);

        }
    }
}