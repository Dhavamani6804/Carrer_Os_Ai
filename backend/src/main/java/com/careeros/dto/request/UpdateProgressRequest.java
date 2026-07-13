package com.careeros.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProgressRequest {

    private String sessionId;

    public enum ProgressCategory {

        TECHNICAL,

        CODING,

        ROADMAP

    }

    private String topic;

    private Integer roadmapIndex;

    private ProgressCategory category;

}
