package com.careeros.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponse {

    private String name;

    private int resumeScore;

    private int applications;

    private int interviews;

    private int skills;

    private int totalTasks;

    private int completedTasks;

    private int todayProgress;

    private int currentStreak;

    private int bestStreak;
}