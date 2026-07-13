
package com.careeros.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrepareJobRequest {

    @NotBlank
    private String applicationId;

}