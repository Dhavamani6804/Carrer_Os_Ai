package com.careeros.entity;

import com.careeros.entity.enums.ApplicationSource;
import com.careeros.entity.enums.ApplicationStatus;
import com.careeros.entity.enums.EmploymentType;
import com.careeros.entity.enums.ExperienceLevel;
import com.careeros.entity.enums.WorkMode;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "job_applications")
public class JobApplication {

    @Id
    private String id;

    // Owner
    private String userId;

    // Basic Information
    private String role;

    private String company;

    private String companyLogo;

    private String jobUrl;

    private String jobDescription;

    // Source
    private ApplicationSource source;

    // Extracted Information
    private String salary;

    private String location;

    private WorkMode workMode;

    private EmploymentType employmentType;

    private ExperienceLevel experienceLevel;

    // AI Extracted Lists
    private List<String> skills;

    private List<String> requirements;

    private List<String> responsibilities;

    // User Notes
    private String notes;

    // Pipeline
    @Builder.Default
    private ApplicationStatus status = ApplicationStatus.WISHLIST;

    // Dates
    private LocalDateTime appliedDate;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Builder.Default
    private List<TimelineEvent> timeline = new ArrayList<>();
}