package com.careeros.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SettingsResponse {

    /*
     * Career
     */

    private String preferredRole;

    private String preferredLocation;

    private String expectedSalary;

    private String workMode;

    private String employmentType;

    private List<String> preferredSkills;

    private Integer dailyStudyGoal;

    /*
     * AI
     */

    private String mentorLevel;

    private String answerLength;

    private Boolean autoGeneratePreparation;

    private Boolean personalizedRecommendations;

    /*
     * Notifications
     */

    private Boolean emailNotifications;

    private Boolean interviewReminders;

    private Boolean applicationReminders;

    private Boolean preparationReminders;

    private Boolean weeklyReport;

    /*
     * Appearance
     */

    private String theme;

    /*
     * Privacy
     */

    private Boolean profileVisible;

}