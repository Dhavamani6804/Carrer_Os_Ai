package com.careeros.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
import java.util.List;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;

    // Authentication
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    // Profile
    private String headline;
    private String about;
    private String phone;
    private String location;

    // Education
    private String college;
    private String degree;
    private Integer graduationYear;

    // Social Links
    private String github;
    private String linkedin;
    private String portfolio;

    // Skills
    private List<String> skills;

    // Profile Image
    private String profileImage;

    // Timestamps
    private Instant createdAt;
    private Instant updatedAt;

    /*
     * Career Preferences
     */

    @Builder.Default
    private String preferredRole = "";

    @Builder.Default
    private String preferredLocation = "";

    @Builder.Default
    private String expectedSalary = "";

    @Builder.Default
    private String workMode = "";

    @Builder.Default
    private String employmentType = "";

    @Builder.Default
    private List<String> preferredSkills = new ArrayList<>();

    @Builder.Default
    private Integer dailyStudyGoal = 2;

    /*
     * AI Preferences
     */

    @Builder.Default
    private String mentorLevel = "INTERMEDIATE";

    @Builder.Default
    private String answerLength = "DETAILED";

    @Builder.Default
    private Boolean autoGeneratePreparation = true;

    @Builder.Default
    private Boolean personalizedRecommendations = true;

    /*
     * Notifications
     */

    @Builder.Default
    private Boolean emailNotifications = true;

    @Builder.Default
    private Boolean interviewReminders = true;

    @Builder.Default
    private Boolean applicationReminders = true;

    @Builder.Default
    private Boolean preparationReminders = true;

    @Builder.Default
    private Boolean weeklyReport = true;

    /*
     * Appearance
     */

    @Builder.Default
    private String theme = "SYSTEM";

    /*
     * Privacy
     */

    @Builder.Default
    private Boolean profileVisible = true;
}