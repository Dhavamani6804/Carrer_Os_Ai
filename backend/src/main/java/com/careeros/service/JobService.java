package com.careeros.service;

import com.careeros.dto.response.JobDetailsResponse;
import com.careeros.dto.response.JobResponse;

import java.util.List;

public interface JobService {

    List<JobResponse> filterJobs(
            String keyword,
            String location,
            String employmentType,
            String experienceLevel
    );

    JobDetailsResponse getJobById(String jobId);

}