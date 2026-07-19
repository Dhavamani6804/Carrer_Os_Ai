package com.careeros.service.impl;

import com.careeros.dto.response.DashboardResponse;
import com.careeros.entity.DailyTask;
import com.careeros.entity.JobApplication;
import com.careeros.entity.Resume;
import com.careeros.entity.User;
import com.careeros.entity.enums.ApplicationStatus;
import com.careeros.repository.DailyTaskRepository;
import com.careeros.repository.JobApplicationRepository;
import com.careeros.repository.ResumeRepository;
import com.careeros.security.CurrentUserService;
import com.careeros.service.DashboardService;
import com.careeros.service.StreakService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.EnumSet;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final CurrentUserService currentUserService;

    private final ResumeRepository resumeRepository;

    private final JobApplicationRepository jobApplicationRepository;

    private final DailyTaskRepository dailyTaskRepository;

    private final StreakService streakService;

    private static final EnumSet<ApplicationStatus> INTERVIEW_STATUSES =
            EnumSet.of(
                    ApplicationStatus.INTERVIEW_ROUND_1,
                    ApplicationStatus.INTERVIEW_ROUND_2,
                    ApplicationStatus.INTERVIEW_ROUND_3,
                    ApplicationStatus.HR_INTERVIEW
            );

    @Override
    public DashboardResponse getDashboard() {

        streakService.refreshStreak();

        User user = currentUserService.getCurrentUser();

        /*
         * Skills
         */
        int skillsCount = user.getSkills() == null
                ? 0
                : user.getSkills().size();

        /*
         * Resume Score
         */
        int resumeScore = resumeRepository
                .findByUserId(user.getId())
                .map(Resume::getResumeScore)
                .orElse(0);

        /*
         * Applications
         */
        List<JobApplication> applications =
                jobApplicationRepository.findByUserId(user.getId());

        int applicationCount = applications.size();

        /*
         * Interviews
         */
        int interviewCount = (int) applications.stream()
                .filter(application ->
                        INTERVIEW_STATUSES.contains(application.getStatus()))
                .count();

        /*
         * Today's Tasks
         */
        List<DailyTask> tasks =
                dailyTaskRepository.findByUserIdAndTaskDateOrderByCreatedAtAsc(
                        user.getId(),
                        LocalDate.now()
                );

        int totalTasks = tasks.size();

        int completedTasks = (int) tasks.stream()
                .filter(DailyTask::isCompleted)
                .count();

        int progress = totalTasks == 0
                ? 0
                : (completedTasks * 100) / totalTasks;

        return DashboardResponse.builder()
                .name(user.getFirstName())
                .resumeScore(resumeScore)
                .applications(applicationCount)
                .interviews(interviewCount)
                .skills(skillsCount)
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .todayProgress(progress)
                .currentStreak(user.getCurrentStreak())
                .bestStreak(user.getBestStreak())
                .build();
    }
}