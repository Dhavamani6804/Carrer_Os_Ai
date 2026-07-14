package com.careeros.dto.request;

import com.careeros.entity.enums.ApplicationStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddTimelineEventRequest {

    private ApplicationStatus status;

    private String title;

    private String note;

}