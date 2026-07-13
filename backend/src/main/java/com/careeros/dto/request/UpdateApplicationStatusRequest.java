
package com.careeros.dto.request;

import com.careeros.entity.enums.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateApplicationStatusRequest {

    @NotNull
    private ApplicationStatus status;

    private String note;

}