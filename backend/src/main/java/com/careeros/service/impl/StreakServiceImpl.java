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

    private final CurrentUserService currentUserService;

    private final DailyTaskRepository dailyTaskRepository;

    private final UserRepository userRepository;

    @Override
    public void updateStreak() {

        User user = currentUserService.getCurrentUser();

        LocalDate today = LocalDate.now();

        List<DailyTask> todayTasks =
                dailyTaskRepository.findByUserIdAndTaskDateOrderByCreatedAtAsc(
                        user.getId(),
                        today
                );

        /*
         * No tasks today
         */
        if (todayTasks.isEmpty()) {
            return;
        }

        /*
         * Not all tasks completed
         */
        boolean allCompleted = todayTasks.stream()
                .allMatch(DailyTask::isCompleted);

        if (!allCompleted) {
            return;
        }

        /*
         * Already counted today
         */
        if (today.equals(user.getLastCompletedDate())) {
            return;
        }

        /*
         * Continue streak
         */
        if (today.minusDays(1).equals(user.getLastCompletedDate())) {

            user.setCurrentStreak(
                    user.getCurrentStreak() + 1
            );

        } else {

            /*
             * Start new streak
             */
            user.setCurrentStreak(1);

        }

        /*
         * Update best streak
         */
        user.setBestStreak(
                Math.max(
                        user.getBestStreak(),
                        user.getCurrentStreak()
                )
        );

        user.setLastCompletedDate(today);

        userRepository.save(user);

    }

    @Override
    public void refreshStreak() {

        User user = currentUserService.getCurrentUser();

        LocalDate today = LocalDate.now();

        if (user.getLastCompletedDate() == null) {
            return;
        }

        if (user.getCurrentStreak() == 0) {
            return;
        }

        if (user.getLastCompletedDate().isBefore(today.minusDays(1))) {

            user.setCurrentStreak(0);

            userRepository.save(user);

        }

    }

}