
package com.careeros.ai;

import com.careeros.client.GeminiClient;
import com.careeros.dto.request.AnalyzeJobDescriptionRequest;
import com.careeros.dto.response.JobDescriptionAnalysisResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class JobDescriptionAnalyzer {

    private final GeminiClient geminiClient;
    private final AIPromptBuilder promptBuilder;
    private final AIResponseParser parser;

    public JobDescriptionAnalysisResponse analyze(
            AnalyzeJobDescriptionRequest request
    ) {

        String prompt = promptBuilder.buildJobDescriptionPrompt(
                request.getRole(),
                request.getJobDescription()
        );

        String response = geminiClient.generateAnswer(prompt);

        log.debug("Prompt: {}", prompt);
        log.debug("Gemini Response: {}", response);

        return parser.parse(response);

    }

}