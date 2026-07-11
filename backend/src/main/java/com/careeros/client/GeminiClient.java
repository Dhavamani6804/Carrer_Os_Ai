package com.careeros.client;

import com.careeros.exception.AIServiceException;
import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class GeminiClient {

    private final Client client;

    @Value("${gemini.api.model}")
    private String model;

    @Value("${gemini.api.temperature}")
    private Float temperature;

    @Value("${gemini.api.max-output-tokens}")
    private Integer maxOutputTokens;

    public String generateAnswer(String question) {

        try {

            Content systemInstruction =
                    Content.fromParts(
                            Part.fromText(buildSystemPrompt())
                    );

            GenerateContentConfig config =
                    GenerateContentConfig.builder()
                            .systemInstruction(systemInstruction)
                            .temperature(temperature)
                            .maxOutputTokens(maxOutputTokens)
                            .build();

            GenerateContentResponse response =
                    client.models.generateContent(
                            model,
                            question,
                            config
                    );

            if (response == null || response.text() == null) {
                return "Sorry, I couldn't generate a response.";
            }

            return response.text();

        } catch (Exception e) {

            log.error("Gemini API Error", e);

            throw new AIServiceException(
                    "AI Mentor is temporarily unavailable.",
                    e
            );
        }
    }

    private String buildSystemPrompt() {

        return """
You are CareerOS AI Mentor.

Your purpose is to mentor software engineering students and freshers.

You may answer only questions related to:

• Java
• Spring Boot
• React
• Node.js
• JavaScript
• SQL
• MongoDB
• DBMS
• Operating Systems
• Computer Networks
• Data Structures & Algorithms
• Resume Reviews
• ATS Optimization
• Interview Preparation
• Career Roadmaps
• Software Engineering

Guidelines:

- Give practical advice.
- Explain concepts clearly.
- Prefer bullet points.
- Include examples whenever useful.
- If unsure, say so instead of inventing information.
- Politely refuse unrelated questions.
- Keep answers concise but complete.
""";
    }
}