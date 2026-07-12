package com.careeros.service.impl;

import com.careeros.dto.response.JobDetailsResponse;
import com.careeros.dto.response.JobResponse;
import com.careeros.entity.Job;
import com.careeros.entity.enums.EmploymentType;
import com.careeros.entity.enums.ExperienceLevel;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.JobRepository;
import com.careeros.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    private final MongoTemplate mongoTemplate;

    @Override
    public List<JobResponse> filterJobs(
            String keyword,
            String location,
            String employmentType,
            String experienceLevel
    ) {

        Query query = new Query();

        query.addCriteria(
                Criteria.where("active").is(true)
        );

        if (keyword != null && !keyword.isBlank()) {

            query.addCriteria(

                    new Criteria().orOperator(

                            Criteria.where("title")
                                    .regex(keyword, "i"),

                            Criteria.where("company")
                                    .regex(keyword, "i"),

                            Criteria.where("skills")
                                    .regex(keyword, "i")

                    )

            );

        }

        if (location != null && !location.isBlank()) {

            query.addCriteria(
                    Criteria.where("location")
                            .is(location)
            );

        }

        if (employmentType != null && !employmentType.isBlank()) {

            query.addCriteria(
                    Criteria.where("employmentType")
                            .is(
                                    EmploymentType.valueOf(
                                            employmentType.toUpperCase()
                                    )
                            )
            );

        }

        if (experienceLevel != null && !experienceLevel.isBlank()) {

            query.addCriteria(
                    Criteria.where("experienceLevel")
                            .is(
                                    ExperienceLevel.valueOf(
                                            experienceLevel.toUpperCase()
                                    )
                            )
            );

        }

        return mongoTemplate.find(query, Job.class)
                .stream()
                .map(this::mapToJobResponse)
                .toList();

    }

    @Override
    public JobDetailsResponse getJobById(String jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found.")
                );

        return mapToJobDetailsResponse(job);

    }

    private JobResponse mapToJobResponse(Job job) {

        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .companyLogo(job.getCompanyLogo())
                .location(job.getLocation())
                .employmentType(job.getEmploymentType())
                .experienceLevel(job.getExperienceLevel())
                .salary(job.getSalary())
                .skills(job.getSkills())
                .postedDate(job.getPostedDate())
                .build();

    }

    private JobDetailsResponse mapToJobDetailsResponse(Job job) {

        return JobDetailsResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .companyLogo(job.getCompanyLogo())
                .location(job.getLocation())
                .employmentType(job.getEmploymentType())
                .experienceLevel(job.getExperienceLevel())
                .salary(job.getSalary())
                .description(job.getDescription())
                .requirements(job.getRequirements())
                .skills(job.getSkills())
                .applyUrl(job.getApplyUrl())
                .postedDate(job.getPostedDate())
                .build();

    }

}