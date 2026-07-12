package com.careeros.ai;

import com.careeros.dto.response.JobDescriptionAnalysisResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AIResponseParser {

    private final ObjectMapper objectMapper;

    public JobDescriptionAnalysisResponse parse(String response) {

        try {

            response = response.trim();

            if (response.startsWith("```json")) {
                response = response.replace("```json", "");
            }

            if (response.startsWith("```")) {
                response = response.replace("```", "");
            }

            if (response.endsWith("```")) {
                response = response.substring(0, response.lastIndexOf("```"));
            }

            response = response.trim();

            response = response
                    .replace("\"workMode\":\"\"", "\"workMode\":null")
                    .replace("\"employmentType\":\"\"", "\"employmentType\":null")
                    .replace("\"experienceLevel\":\"\"", "\"experienceLevel\":null");

            System.out.println("========== CLEAN JSON ==========");
            System.out.println(response);

            return objectMapper.readValue(
                    response,
                    JobDescriptionAnalysisResponse.class
            );

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Unable to parse AI response.",
                    e
            );
        }
    }

}