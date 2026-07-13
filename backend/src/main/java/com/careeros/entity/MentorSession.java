
package com.careeros.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "mentor_sessions")
public class MentorSession {

    @Id
    private String id;

    /*
     * Owner
     */
    private String userId;

    /*
     * Linked Career Hub Application
     */
    private String applicationId;

    /*
     * Basic Info
     */
    private String role;

    private String company;

    /*
     * AI Generated Preparation Plan
     */
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

    /*
     * Chat History
     */
    @Builder.Default
    private List<MentorMessage> messages = new ArrayList<>();

    /*
     * Progress
     */
    @Builder.Default
    private Integer completionPercentage = 0;

    /*
     * Metadata
     */
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Builder.Default
    private Boolean archived = false;

}