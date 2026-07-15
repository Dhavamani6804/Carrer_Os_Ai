
package com.careeros.service.impl;

import com.careeros.ai.PreparationPromptBuilder;
import com.careeros.ai.PreparationResponseParser;
import com.careeros.client.GeminiClient;
import com.careeros.dto.request.PrepareJobRequest;
import com.careeros.dto.response.PreparationPlanResponse;
import com.careeros.entity.JobApplication;
import com.careeros.entity.MentorSession;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.JobApplicationRepository;
import com.careeros.repository.MentorSessionRepository;
import com.careeros.service.AIPreparationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AIPreparationServiceImpl
        implements AIPreparationService {

    private final JobApplicationRepository jobApplicationRepository;

    private final MentorSessionRepository mentorSessionRepository;

    private final GeminiClient geminiClient;

    private final PreparationPromptBuilder promptBuilder;

    private final PreparationResponseParser parser;

    @Override
    public PreparationPlanResponse startPreparation(
            PrepareJobRequest request
    ) {

        /*
         * STEP 1
         * Reuse existing preparation session
         */

        if (mentorSessionRepository.existsByApplicationId(
                request.getApplicationId())) {

            MentorSession existing =
                    mentorSessionRepository
                            .findByApplicationId(request.getApplicationId())
                            .orElse(null);

            if (existing != null) {
                return mapToResponse(existing);
            }

        }

        /*
         * STEP 2
         * Load Job Application
         */

        JobApplication application =
                jobApplicationRepository.findById(
                        request.getApplicationId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found."
                        ));

        /*
         * STEP 3
         * Ask Gemini
         */

        String prompt =
                promptBuilder.buildPreparationPrompt(
                        application
                );

        String aiResponse =
                geminiClient.generateAnswer(prompt);

        PreparationPlanResponse response =
                parser.parse(aiResponse);

        /*
         * STEP 4
         * Save Mentor Session
         */

        String preparationContext = """
                Candidate is preparing for:
                
                Role: %s
                Company: %s
                
                Required Skills:
                %s
                
                Requirements:
                %s
                
                Responsibilities:
                %s
                
                Focus the mentor on this company and role.
                """
                .formatted(
                        application.getRole(),
                        application.getCompany(),
                        application.getSkills(),
                        application.getRequirements(),
                        application.getResponsibilities()
                );

        MentorSession session = MentorSession.builder()

                .userId(application.getUserId())

                .applicationId(application.getId())

                .role(application.getRole())

                .company(application.getCompany())

                .overview(response.getOverview())

                .technicalTopics(response.getTechnicalTopics())

                .codingTopics(response.getCodingTopics())

                .interviewQuestions(response.getInterviewQuestions())

                .behavioralQuestions(response.getBehavioralQuestions())

                .projectSuggestions(response.getProjectSuggestions())

                .preparationRoadmap(response.getPreparationRoadmap())

                .strengths(response.getStrengths())

                .weaknesses(response.getWeaknesses())

                .finalAdvice(response.getFinalAdvice())

                .createdAt(LocalDateTime.now())

                .updatedAt(LocalDateTime.now())

                .preparationContext(preparationContext)

                .build();

        mentorSessionRepository.save(session);

        response.setSessionId(session.getId());

        response.setApplicationId(application.getId());

        response.setRole(application.getRole());

        response.setCompany(application.getCompany());

        return response;

    }

    /*
     * Mapper
     */

    private PreparationPlanResponse mapToResponse(
            MentorSession session
    ) {

        return PreparationPlanResponse.builder()

                .sessionId(session.getId())

                .applicationId(session.getApplicationId())

                .role(session.getRole())

                .company(session.getCompany())

                .overview(session.getOverview())

                .technicalTopics(session.getTechnicalTopics())

                .codingTopics(session.getCodingTopics())

                .interviewQuestions(session.getInterviewQuestions())

                .behavioralQuestions(session.getBehavioralQuestions())

                .projectSuggestions(session.getProjectSuggestions())

                .preparationRoadmap(session.getPreparationRoadmap())

                .strengths(session.getStrengths())

                .weaknesses(session.getWeaknesses())

                .finalAdvice(session.getFinalAdvice())

                .build();

    }

}