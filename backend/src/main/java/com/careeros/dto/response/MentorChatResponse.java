package com.careeros.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorChatResponse {

    private String answer;

    @Builder.Default
    private boolean aiAvailable = true;

}