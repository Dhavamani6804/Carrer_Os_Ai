package com.careeros.dto.response;

import com.careeros.entity.TimelineEvent;
import com.careeros.entity.enums.EmploymentType;
import com.careeros.entity.enums.ExperienceLevel;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobDetailsResponse {

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

    private LocalDateTime postedDate;

    private List<TimelineEvent> timeline;

}