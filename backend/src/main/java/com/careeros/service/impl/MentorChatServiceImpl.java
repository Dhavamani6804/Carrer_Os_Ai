
package com.careeros.service.impl;

import com.careeros.ai.MentorPromptBuilder;
import com.careeros.client.GeminiClient;
import com.careeros.dto.request.MentorChatRequest;
import com.careeros.dto.response.MentorChatResponse;
import com.careeros.entity.MentorMessage;
import com.careeros.entity.MentorSession;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.MentorSessionRepository;
import com.careeros.service.MentorChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MentorChatServiceImpl
        implements MentorChatService {

    private final MentorSessionRepository mentorSessionRepository;

    private final GeminiClient geminiClient;

    private final MentorPromptBuilder promptBuilder;

    @Override
    public MentorChatResponse chat(
            MentorChatRequest request
    ) {

        MentorSession session =
                mentorSessionRepository.findById(
                        request.getSessionId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Preparation session not found."
                        ));

        session.getMessages().add(

                MentorMessage.builder()

                        .sender("USER")

                        .message(request.getMessage())

                        .build()

        );

        String prompt =
                promptBuilder.buildPrompt(
                        session,
                        request.getMessage()
                );

        String answer =
                geminiClient.generateAnswer(prompt);

        session.getMessages().add(

                MentorMessage.builder()

                        .sender("AI")

                        .message(answer)

                        .build()

        );

        mentorSessionRepository.save(session);

        return MentorChatResponse.builder()

                .answer(answer)

                .build();

    }

}