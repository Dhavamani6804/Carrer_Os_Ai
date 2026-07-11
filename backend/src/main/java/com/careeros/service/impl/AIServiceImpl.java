package com.careeros.service.impl;

import com.careeros.client.GeminiClient;
import com.careeros.dto.request.AIRequest;
import com.careeros.dto.response.AIResponse;
import com.careeros.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIServiceImpl implements AIService {

    private final GeminiClient geminiClient;

    @Override
    public AIResponse askQuestion(AIRequest request) {

        String answer = geminiClient.generateAnswer(request.getQuestion());

        return AIResponse.builder()
                .answer(answer)
                .build();
    }
}