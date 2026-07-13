
package com.careeros.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyzeJobDescriptionRequest {

    @NotBlank(message = "Role is required.")
    private String role;

    @NotBlank(message = "Job description is required.")
    private String jobDescription;

    private String jobUrl;

}