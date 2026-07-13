
package com.careeros.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorChatRequest {

    @NotBlank(message = "Session Id is required.")
    private String sessionId;

    @NotBlank(message = "Message cannot be empty.")
    private String message;

}