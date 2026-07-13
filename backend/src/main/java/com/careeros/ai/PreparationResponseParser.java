
package com.careeros.ai;

import com.careeros.dto.response.PreparationPlanResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PreparationResponseParser {

    private final ObjectMapper objectMapper;

    public PreparationPlanResponse parse(String response) {

        try {

            response = cleanJson(response);

            System.out.println("========== PREPARATION JSON ==========");
            System.out.println(response);

            return objectMapper.readValue(
                    response,
                    PreparationPlanResponse.class
            );

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Unable to parse preparation plan.",
                    e
            );

        }

    }

    private String cleanJson(String response) {

        if (response == null) {
            return "{}";
        }

        response = response.trim();

        response = response
                .replace("```json", "")
                .replace("```", "")
                .trim();

        int start = response.indexOf("{");
        int end = response.lastIndexOf("}");

        if (start != -1 && end != -1 && end > start) {
            response = response.substring(start, end + 1);
        }

        return response;

    }

}