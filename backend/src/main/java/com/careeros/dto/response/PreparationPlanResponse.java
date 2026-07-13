
package com.careeros.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreparationPlanResponse {

    private String sessionId;

    private String applicationId;

    private String role;

    private String company;

    private String overview;

    private List<String> technicalTopics;

    private List<String> codingTopics;

    private List<String> interviewQuestions;

    private List<String> behavioralQuestions;

    private List<String> projectSuggestions;

    private List<String> preparationRoadmap;

    private List<String> strengths;

    private List<String> weaknesses;

    private String finalAdvice;

}