package com.careeros.entity;

import com.careeros.entity.enums.ApplicationStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimelineEvent {

    /**
     * Unique Timeline Event ID
     */
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    /**
     * Related Application Status
     */
    private ApplicationStatus status;

    /**
     * Short title shown in timeline
     * Example:
     * Recruiter Call
     * OA Completed
     * Interview Scheduled
     * Offer Received
     */
    private String title;

    /**
     * Detailed description / notes
     */
    private String note;

    /**
     * Event Type
     * AUTO   -> generated automatically by CareerOS
     * MANUAL -> added by the user
     */
    @Builder.Default
    private String type = "MANUAL";

    /**
     * Event creation time
     */
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

}