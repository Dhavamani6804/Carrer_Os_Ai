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
@Document(collection = "general_mentor_sessions")
public class GeneralMentorSession {

    @Id
    private String id;

    private String userId;

    /*
     * Category
     *
     * Examples:
     * DSA
     * Java
     * SQL
     * React
     * Aptitude
     * HR
     */
    private String category;

    /*
     * AI Suggested Learning Topics
     */
    @Builder.Default
    private List<String> topics = new ArrayList<>();

    /*
     * Chat History
     */
    @Builder.Default
    private List<GeneralMentorMessage> messages = new ArrayList<>();

    /*
     * Progress
     */
    @Builder.Default
    private GeneralMentorProgress progress =
            GeneralMentorProgress.builder().build();

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

}