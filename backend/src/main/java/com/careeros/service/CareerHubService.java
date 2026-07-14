package com.careeros.service;

import com.careeros.dto.request.*;
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

    JobApplicationDetailsResponse updateNotes(
            String applicationId,
            UpdateNotesRequest request
    );

    JobApplicationDetailsResponse addTimelineEvent(
            String applicationId,
            AddTimelineEventRequest request
    );

    JobApplicationDetailsResponse updateTimelineEvent(
            String applicationId,
            String eventId,
            UpdateTimelineEventRequest request
    );

    void deleteTimelineEvent(
            String applicationId,
            String eventId
    );

    void deleteApplication(
            String applicationId
    );

    CareerHubStatsResponse getStats();

}