package com.careeros.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorMessageResponse {

    private String sender;

    private String message;

    private LocalDateTime timestamp;

}