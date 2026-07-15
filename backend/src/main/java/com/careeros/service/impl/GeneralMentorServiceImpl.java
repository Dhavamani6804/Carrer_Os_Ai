package com.careeros.service.impl;

import com.careeros.ai.GeneralMentorPromptBuilder;
import com.careeros.client.GeminiClient;
import com.careeros.entity.GeneralMentorMessage;
import com.careeros.entity.GeneralMentorSession;
import com.careeros.entity.User;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.GeneralMentorSessionRepository;
import com.careeros.repository.UserRepository;
import com.careeros.service.GeneralMentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeneralMentorServiceImpl
        implements GeneralMentorService {

    private final UserRepository userRepository;

    private final GeneralMentorSessionRepository repository;

    private final GeminiClient geminiClient;

    private final GeneralMentorPromptBuilder promptBuilder;

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

    }

    @Override
    public GeneralMentorSession startSession(
            String category
    ) {

        User user = getCurrentUser();

        return repository.findByUserIdAndCategory(
                        user.getId(),
                        category
                )
                .orElseGet(() ->

                        repository.save(

                                GeneralMentorSession.builder()

                                        .userId(user.getId())

                                        .category(category)

                                        .build()

                        )

                );

    }

    @Override
    public String chat(
            String sessionId,
            String message
    ) {

        GeneralMentorSession session =
                repository.findById(sessionId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Session not found."
                                ));

        session.getMessages().add(

                GeneralMentorMessage.builder()

                        .sender("USER")

                        .message(message)

                        .build()

        );

        String prompt =
                promptBuilder.buildPrompt(
                        session,
                        message
                );

        String answer;

        try {

            answer =
                    geminiClient.generateAnswer(prompt);

        } catch (Exception ex) {

            answer =
                    "AI Mentor is temporarily unavailable. Please try again later.";

        }

        session.getMessages().add(

                GeneralMentorMessage.builder()

                        .sender("AI")

                        .message(answer)

                        .build()

        );

        repository.save(session);

        return answer;

    }

    @Override
    public GeneralMentorSession getSession(
            String sessionId
    ) {

        return repository.findById(sessionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Session not found."
                        ));

    }

}