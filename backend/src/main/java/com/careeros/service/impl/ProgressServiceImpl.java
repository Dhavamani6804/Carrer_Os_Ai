
package com.careeros.service.impl;

import com.careeros.dto.request.UpdateProgressRequest;
import com.careeros.dto.response.ProgressResponse;
import com.careeros.entity.MentorProgress;
import com.careeros.entity.MentorSession;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.MentorProgressRepository;
import com.careeros.repository.MentorSessionRepository;
import com.careeros.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProgressServiceImpl implements ProgressService {

    private final MentorProgressRepository progressRepository;

    private final MentorSessionRepository sessionRepository;

    @Override
    public ProgressResponse updateProgress(
            UpdateProgressRequest request
    ) {

        MentorSession session = sessionRepository
                .findById(request.getSessionId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Preparation session not found.")
                );

        MentorProgress progress = progressRepository
                .findBySessionId(request.getSessionId())
                .orElse(
                        MentorProgress.builder()
                                .sessionId(request.getSessionId())
                                .build()
                );

        switch (request.getCategory()) {

            case TECHNICAL -> {

                if (progress.getCompletedTechnicalTopics().contains(request.getTopic())) {

                    progress.getCompletedTechnicalTopics().remove(request.getTopic());

                } else {

                    progress.getCompletedTechnicalTopics().add(request.getTopic());

                }

            }

            case CODING -> {

                if (progress.getCompletedCodingTopics().contains(request.getTopic())) {

                    progress.getCompletedCodingTopics().remove(request.getTopic());

                } else {

                    progress.getCompletedCodingTopics().add(request.getTopic());

                }

            }

            case ROADMAP -> {

                if (progress.getCompletedRoadmapSteps().contains(request.getRoadmapIndex())) {

                    progress.getCompletedRoadmapSteps().remove(request.getRoadmapIndex());

                } else {

                    progress.getCompletedRoadmapSteps().add(request.getRoadmapIndex());

                }

            }

        }

        int totalItems =

                session.getTechnicalTopics().size()

                        + session.getCodingTopics().size()

                        + session.getPreparationRoadmap().size();

        int completed =

                progress.getCompletedTechnicalTopics().size()

                        + progress.getCompletedCodingTopics().size()

                        + progress.getCompletedRoadmapSteps().size();

        int percentage =

                totalItems == 0

                        ? 0

                        : (completed * 100) / totalItems;

        progress.setProgressPercentage(percentage);

        progressRepository.save(progress);

        session.setCompletionPercentage(percentage);

        sessionRepository.save(session);

        return ProgressResponse.builder()

                .progressPercentage(progress.getProgressPercentage())

                .completedTechnicalTopics(
                        progress.getCompletedTechnicalTopics().size())

                .completedCodingTopics(
                        progress.getCompletedCodingTopics().size())

                .completedRoadmapSteps(
                        progress.getCompletedRoadmapSteps().size())

                .completedTechnicalTopicsList(
                        progress.getCompletedTechnicalTopics())

                .completedCodingTopicsList(
                        progress.getCompletedCodingTopics())

                .completedRoadmapStepsList(
                        progress.getCompletedRoadmapSteps())

                .build();

    }

    @Override
    public ProgressResponse getProgress(String sessionId) {

        MentorProgress progress = progressRepository
                .findBySessionId(sessionId)
                .orElseGet(() -> {

                    MentorProgress newProgress = MentorProgress.builder()

                            .sessionId(sessionId)

                            .progressPercentage(0)

                            .build();

                    return progressRepository.save(newProgress);

                });

        return ProgressResponse.builder()

                .progressPercentage(progress.getProgressPercentage())

                .completedTechnicalTopics(progress.getCompletedTechnicalTopics().size())

                .completedCodingTopics(progress.getCompletedCodingTopics().size())

                .completedRoadmapSteps(progress.getCompletedRoadmapSteps().size())

                .completedTechnicalTopicsList(progress.getCompletedTechnicalTopics())

                .completedCodingTopicsList(progress.getCompletedCodingTopics())

                .completedRoadmapStepsList(progress.getCompletedRoadmapSteps())

                .build();

    }

}