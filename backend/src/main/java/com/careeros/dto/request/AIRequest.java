package com.careeros.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIRequest {

    @NotBlank(message = "Question cannot be empty")
    private String question;

}