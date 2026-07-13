package com.careeros.dto.request;

import com.careeros.entity.enums.ApplicationSource;
import com.careeros.entity.enums.EmploymentType;
import com.careeros.entity.enums.ExperienceLevel;
import com.careeros.entity.enums.WorkMode;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateJobApplicationRequest {

    @NotBlank(message = "Role is required.")
    private String role;

    @NotBlank(message = "Company is required.")
    private String company;

    private String companyLogo;

    @NotBlank(message = "Job description is required.")
    private String jobDescription;

    private String jobUrl;

    private ApplicationSource source;

    private String salary;

    private String location;

    @JsonSetter(nulls = Nulls.AS_EMPTY)
    private WorkMode workMode;

    private EmploymentType employmentType;

    private ExperienceLevel experienceLevel;

    private List<String> skills;

    private List<String> requirements;

    private List<String> responsibilities;

    private String notes;
}