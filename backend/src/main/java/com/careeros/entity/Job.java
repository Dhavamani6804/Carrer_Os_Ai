package com.careeros.entity;

import com.careeros.entity.enums.EmploymentType;
import com.careeros.entity.enums.ExperienceLevel;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "jobs")
public class Job {

    @Id
    private String id;

    private String title;

    private String company;

    private String companyLogo;

    private String location;

    private EmploymentType employmentType;

    private ExperienceLevel experienceLevel;

    private String salary;

    private String description;

    private List<String> requirements;

    private List<String> skills;

    private String applyUrl;

    @Builder.Default
    private Boolean active = true;

    @Builder.Default
    private LocalDateTime postedDate = LocalDateTime.now();

}