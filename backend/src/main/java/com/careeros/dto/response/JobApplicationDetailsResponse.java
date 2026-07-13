
package com.careeros.dto.response;

import com.careeros.entity.enums.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationDetailsResponse {

    private String id;

    private String role;

    private String company;

    private String companyLogo;

    private String jobUrl;

    private String jobDescription;

    private ApplicationSource source;

    private String salary;

    private String location;

    private WorkMode workMode;

    private EmploymentType employmentType;

    private ExperienceLevel experienceLevel;

    private List<String> skills;

    private List<String> requirements;

    private List<String> responsibilities;

    private String notes;

    private ApplicationStatus status;

    private LocalDateTime appliedDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}