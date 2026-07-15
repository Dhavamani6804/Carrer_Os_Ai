package com.careeros.entity;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GeneralMentorProgress {

    @Builder.Default
    private List<String> completedTopics = new ArrayList<>();

    @Builder.Default
    private Integer progressPercentage = 0;

}