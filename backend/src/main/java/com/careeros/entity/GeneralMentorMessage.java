package com.careeros.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GeneralMentorMessage {

    private String sender;

    private String message;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

}