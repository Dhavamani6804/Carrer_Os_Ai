
package com.careeros.mapper;

import com.careeros.dto.response.JobApplicationDetailsResponse;
import com.careeros.dto.response.JobApplicationResponse;
import com.careeros.entity.JobApplication;
import org.springframework.stereotype.Component;

@Component
public class JobApplicationMapper {

    public JobApplicationResponse toResponse(JobApplication application) {

        return JobApplicationResponse.builder()
                .id(application.getId())
                .role(application.getRole())
                .company(application.getCompany())
                .companyLogo(application.getCompanyLogo())
                .location(application.getLocation())
                .salary(application.getSalary())
                .source(application.getSource())
                .status(application.getStatus())
                .appliedDate(application.getAppliedDate())
                .build();
    }

    public JobApplicationDetailsResponse toDetailsResponse(JobApplication application) {

        return JobApplicationDetailsResponse.builder()
                .id(application.getId())
                .role(application.getRole())
                .company(application.getCompany())
                .companyLogo(application.getCompanyLogo())
                .jobUrl(application.getJobUrl())
                .jobDescription(application.getJobDescription())
                .source(application.getSource())
                .salary(application.getSalary())
                .location(application.getLocation())
                .workMode(application.getWorkMode())
                .employmentType(application.getEmploymentType())
                .experienceLevel(application.getExperienceLevel())
                .skills(application.getSkills())
                .requirements(application.getRequirements())
                .responsibilities(application.getResponsibilities())
                .notes(application.getNotes())
                .status(application.getStatus())
                .appliedDate(application.getAppliedDate())
                .createdAt(application.getCreatedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }

}