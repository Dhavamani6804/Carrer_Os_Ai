package com.careeros.service;

import com.careeros.dto.request.CreateJobApplicationRequest;
import com.careeros.dto.request.UpdateApplicationStatusRequest;
import com.careeros.dto.response.CareerHubStatsResponse;
import com.careeros.dto.response.JobApplicationDetailsResponse;
import com.careeros.dto.response.JobApplicationResponse;

import java.util.List;

public interface CareerHubService {

    JobApplicationDetailsResponse createApplication(
            CreateJobApplicationRequest request
    );

    List<JobApplicationResponse> getApplications();

    JobApplicationDetailsResponse getApplicationById(
            String applicationId
    );

    JobApplicationDetailsResponse updateStatus(
            String applicationId,
            UpdateApplicationStatusRequest request
    );

    void deleteApplication(
            String applicationId
    );

    CareerHubStatsResponse getStats();

}