
package com.careeros.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressResponse {

    private Integer progressPercentage;

    private Integer completedTechnicalTopics;

    private Integer completedCodingTopics;

    private Integer completedRoadmapSteps;

    private List<String> completedTechnicalTopicsList;

    private List<String> completedCodingTopicsList;

    private List<Integer> completedRoadmapStepsList;
}