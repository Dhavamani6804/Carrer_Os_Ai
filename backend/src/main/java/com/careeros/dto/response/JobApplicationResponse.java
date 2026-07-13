
package com.careeros.dto.response;

import com.careeros.entity.enums.ApplicationSource;
import com.careeros.entity.enums.ApplicationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationResponse {

    private String id;

    private String role;

    private String company;

    private String companyLogo;

    private String location;

    private String salary;

    private ApplicationSource source;

    private ApplicationStatus status;

    private LocalDateTime appliedDate;

}