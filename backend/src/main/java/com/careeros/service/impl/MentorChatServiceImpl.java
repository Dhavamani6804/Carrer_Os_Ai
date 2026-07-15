package com.careeros.service.impl;

import com.careeros.ai.MentorPromptBuilder;
import com.careeros.client.GeminiClient;
import com.careeros.dto.request.MentorChatRequest;
import com.careeros.dto.response.MentorChatResponse;
import com.careeros.dto.response.MentorMessageResponse;
import com.careeros.entity.MentorMessage;
import com.careeros.entity.MentorProgress;
import com.careeros.entity.MentorSession;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.MentorProgressRepository;
import com.careeros.repository.MentorSessionRepository;
import com.careeros.service.MentorChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MentorChatServiceImpl implements MentorChatService {

    private final MentorSessionRepository mentorSessionRepository;
    private final MentorProgressRepository mentorProgressRepository;
    private final GeminiClient geminiClient;
    private final MentorPromptBuilder promptBuilder;

    @Override
    public MentorChatResponse chat(MentorChatRequest request) {

        MentorSession session =
                mentorSessionRepository.findById(request.getSessionId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Preparation session not found."
                                ));

        MentorProgress progress =
                mentorProgressRepository
                        .findBySessionId(request.getSessionId())
                        .orElse(null);

        String progressContext =
                buildProgressContext(session, progress);

        session.getMessages().add(

                MentorMessage.builder()

                        .sender("USER")

                        .message(request.getMessage())

                        .build()

        );

        String prompt =
                promptBuilder.buildPrompt(
                        session,
                        progressContext,
                        request.getMessage()
                );

        String answer;
        boolean aiAvailable = true;

        try {

            answer = geminiClient.generateAnswer(prompt);

        } catch (Exception ex) {

            aiAvailable = false;

            answer = """
                    AI Mentor is temporarily unavailable.
                    
                    Your question has been saved.
                    
                    Please try again in a few moments.
                    """;

        }

        session.getMessages().add(

                MentorMessage.builder()

                        .sender("AI")

                        .message(answer)

                        .build()

        );

        if (session.getMessages().size() > 50) {

            session.setMessages(
                    session.getMessages()
                            .subList(
                                    session.getMessages().size() - 50,
                                    session.getMessages().size()
                            )
            );

        }

        mentorSessionRepository.save(session);

        return MentorChatResponse.builder()
                .answer(answer)
                .aiAvailable(aiAvailable)
                .build();

    }

    @Override
    public List<MentorMessageResponse> getMessages(String sessionId) {

        MentorSession session =
                mentorSessionRepository.findById(sessionId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Preparation session not found."
                                ));

        return session.getMessages()
                .stream()
                .map(message ->
                        MentorMessageResponse.builder()
                                .sender(message.getSender())
                                .message(message.getMessage())
                                .timestamp(message.getTimestamp())
                                .build()
                )
                .toList();

    }

    private String buildProgressContext(
            MentorSession session,
            MentorProgress progress
    ) {

        if (progress == null) {
            return "No preparation progress yet.";
        }

        StringBuilder builder = new StringBuilder();

        builder.append("Overall Progress: ")
                .append(progress.getProgressPercentage())
                .append("%\n\n");

        builder.append("Completed Technical Topics:\n");

        if (progress.getCompletedTechnicalTopics().isEmpty()) {

            builder.append("None\n");

        } else {

            progress.getCompletedTechnicalTopics()
                    .forEach(topic ->
                            builder.append("- ")
                                    .append(topic)
                                    .append("\n"));

        }

        builder.append("\nCompleted Coding Topics:\n");

        if (progress.getCompletedCodingTopics().isEmpty()) {

            builder.append("None\n");

        } else {

            progress.getCompletedCodingTopics()
                    .forEach(topic ->
                            builder.append("- ")
                                    .append(topic)
                                    .append("\n"));

        }

        builder.append("\nCompleted Roadmap Steps:\n");

        if (progress.getCompletedRoadmapSteps().isEmpty()) {

            builder.append("None\n");

        } else {

            progress.getCompletedRoadmapSteps()
                    .forEach(index -> {

                        if (index >= 0 &&
                                index < session.getPreparationRoadmap().size()) {

                            builder.append("- ")
                                    .append(session.getPreparationRoadmap().get(index))
                                    .append("\n");

                        }

                    });

        }

        return builder.toString();

    }

}