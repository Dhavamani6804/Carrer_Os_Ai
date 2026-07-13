package com.careeros.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "mentor_progress")
public class MentorProgress {

    @Id
    private String id;

    private String sessionId;

    @Builder.Default
    private List<String> completedTechnicalTopics = new ArrayList<>();

    @Builder.Default
    private List<String> completedCodingTopics = new ArrayList<>();

    @Builder.Default
    private List<Integer> completedRoadmapSteps = new ArrayList<>();

    @Builder.Default
    private Integer progressPercentage = 0;

}
