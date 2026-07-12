package com.careeros.entity;

import com.careeros.entity.enums.ApplicationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimelineEvent {

    private ApplicationStatus status;

    private String note;

    private LocalDateTime timestamp;

}