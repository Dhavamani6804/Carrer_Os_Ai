package com.careeros.service.impl;

import com.careeros.dto.request.CreateJobApplicationRequest;
import com.careeros.dto.request.UpdateApplicationStatusRequest;
import com.careeros.dto.response.CareerHubStatsResponse;
import com.careeros.dto.response.JobApplicationDetailsResponse;
import com.careeros.dto.response.JobApplicationResponse;
import com.careeros.entity.JobApplication;
import com.careeros.entity.TimelineEvent;
import com.careeros.entity.enums.ApplicationStatus;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.mapper.JobApplicationMapper;
import com.careeros.repository.JobApplicationRepository;
import com.careeros.service.CareerHubService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.careeros.security.CurrentUserService;
import com.careeros.dto.request.AddTimelineEventRequest;
import com.careeros.dto.request.UpdateNotesRequest;
import com.careeros.dto.request.UpdateTimelineEventRequest;
import java.util.UUID;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CareerHubServiceImpl implements CareerHubService {

    private final JobApplicationRepository repository;

    private final JobApplicationMapper mapper;
    private final CurrentUserService currentUserService;

    @Override
    public JobApplicationDetailsResponse createApplication(
            CreateJobApplicationRequest request
    ) {

        try {

            JobApplication application = JobApplication.builder()

                    .userId(currentUserService.getCurrentUserId())

                    .role(request.getRole())
                    .company(request.getCompany())
                    .companyLogo(request.getCompanyLogo())
                    .jobDescription(request.getJobDescription())
                    .jobUrl(request.getJobUrl())
                    .source(request.getSource())
                    .salary(request.getSalary())
                    .location(request.getLocation())
                    .workMode(request.getWorkMode())
                    .employmentType(request.getEmploymentType())
                    .experienceLevel(request.getExperienceLevel())
                    .skills(request.getSkills())
                    .requirements(request.getRequirements())
                    .responsibilities(request.getResponsibilities())
                    .notes(request.getNotes())

                    .status(ApplicationStatus.WISHLIST)

                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())

                    .build();

            repository.save(application);

            return mapper.toDetailsResponse(application);

        } catch (Exception e) {

            e.printStackTrace();

            throw e;
        }
    }

    @Override
    public List<JobApplicationResponse> getApplications() {

        String userId = currentUserService.getCurrentUserId();

        return repository.findByUserId(userId)
                .stream()
                .map(mapper::toResponse)
                .toList();

    }

    @Override
    public JobApplicationDetailsResponse getApplicationById(
            String applicationId
    ) {

        JobApplication application =
                repository.findById(applicationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Application not found.")
                        );

        if (!application.getUserId().equals(currentUserService.getCurrentUserId())) {
            throw new ResourceNotFoundException("Application not found.");
        }

        return mapper.toDetailsResponse(application);

    }

    @Override
    public JobApplicationDetailsResponse updateStatus(
            String applicationId,
            UpdateApplicationStatusRequest request
    ) {

        JobApplication application = repository.findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application not found."));
        if (!application.getUserId().equals(currentUserService.getCurrentUserId())) {
            throw new ResourceNotFoundException("Application not found.");
        }

        application.setStatus(request.getStatus());

        // Automatically store the first applied date
        if (request.getStatus() == ApplicationStatus.APPLIED
                && application.getAppliedDate() == null) {

            application.setAppliedDate(LocalDateTime.now());

        }

        application.getTimeline().add(

                TimelineEvent.builder()

                        .status(request.getStatus())

                        .note(request.getNote())

                        .timestamp(LocalDateTime.now())

                        .build()

        );

        application.setUpdatedAt(LocalDateTime.now());

        repository.save(application);

        return mapper.toDetailsResponse(application);

    }

    @Override
    public void deleteApplication(String applicationId) {

        JobApplication application = repository.findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application not found."));
        if (!application.getUserId().equals(currentUserService.getCurrentUserId())) {
            throw new ResourceNotFoundException("Application not found.");
        }

        repository.delete(application);

    }

    private JobApplication getOwnedApplication(String applicationId) {

        JobApplication application = repository.findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application not found."));

        if (!application.getUserId().equals(currentUserService.getCurrentUserId())) {
            throw new ResourceNotFoundException("Application not found.");
        }

        return application;
    }

    @Override
    public JobApplicationDetailsResponse updateNotes(
            String applicationId,
            UpdateNotesRequest request
    ) {

        JobApplication application = getOwnedApplication(applicationId);

        application.setNotes(request.getNotes());

        application.setUpdatedAt(LocalDateTime.now());

        repository.save(application);

        return mapper.toDetailsResponse(application);

    }

    @Override
    public JobApplicationDetailsResponse addTimelineEvent(
            String applicationId,
            AddTimelineEventRequest request
    ) {

        JobApplication application = getOwnedApplication(applicationId);

        TimelineEvent event = TimelineEvent.builder()

                .id(UUID.randomUUID().toString())

                .title(request.getTitle())

                .status(request.getStatus())

                .note(request.getNote())

                .timestamp(LocalDateTime.now())

                .build();

        application.getTimeline().add(event);

        application.setUpdatedAt(LocalDateTime.now());

        repository.save(application);

        return mapper.toDetailsResponse(application);

    }

    @Override
    public JobApplicationDetailsResponse updateTimelineEvent(
            String applicationId,
            String eventId,
            UpdateTimelineEventRequest request
    ) {

        JobApplication application = getOwnedApplication(applicationId);

        TimelineEvent event = application.getTimeline()

                .stream()

                .filter(e -> e.getId().equals(eventId))

                .findFirst()

                .orElseThrow(() ->
                        new ResourceNotFoundException("Timeline event not found."));

        event.setStatus(request.getStatus());

        event.setNote(request.getNote());

        application.setUpdatedAt(LocalDateTime.now());

        repository.save(application);

        return mapper.toDetailsResponse(application);

    }

    @Override
    public void deleteTimelineEvent(
            String applicationId,
            String eventId
    ) {

        JobApplication application = getOwnedApplication(applicationId);

        application.getTimeline()

                .removeIf(event -> event.getId().equals(eventId));

        application.setUpdatedAt(LocalDateTime.now());

        repository.save(application);

    }

    @Override
    public CareerHubStatsResponse getStats() {

        String userId = currentUserService.getCurrentUserId();

        return CareerHubStatsResponse.builder()

                .wishlist(
                        repository.countByUserIdAndStatus(
                                userId,
                                ApplicationStatus.WISHLIST
                        )
                )

                .applied(
                        repository.countByUserIdAndStatus(
                                userId,
                                ApplicationStatus.APPLIED
                        )
                )

                .interviewing(
                        repository.countByUserIdAndStatusIn(
                                userId,
                                List.of(
                                        ApplicationStatus.INTERVIEW_ROUND_1,
                                        ApplicationStatus.INTERVIEW_ROUND_2,
                                        ApplicationStatus.INTERVIEW_ROUND_3,
                                        ApplicationStatus.HR_INTERVIEW
                                )
                        )
                )

                .offers(
                        repository.countByUserIdAndStatusIn(
                                userId,
                                List.of(
                                        ApplicationStatus.OFFER_RECEIVED,
                                        ApplicationStatus.OFFER_ACCEPTED
                                )
                        )
                )

                .joined(
                        repository.countByUserIdAndStatus(
                                userId,
                                ApplicationStatus.JOINED
                        )
                )

                .rejected(
                        repository.countByUserIdAndStatusIn(
                                userId,
                                List.of(
                                        ApplicationStatus.REJECTED,
                                        ApplicationStatus.OA_REJECTED
                                )
                        )
                )

                .build();
    }
}