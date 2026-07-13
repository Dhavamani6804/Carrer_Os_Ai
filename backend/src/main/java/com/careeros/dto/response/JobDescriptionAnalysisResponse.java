
package com.careeros.dto.response;

import com.careeros.entity.enums.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobDescriptionAnalysisResponse {

    private String company;

    private String companyLogo;

    private String salary;

    private String location;

    private WorkMode workMode;

    private EmploymentType employmentType;

    private ExperienceLevel experienceLevel;

    private List<String> skills;

    private List<String> requirements;

    private List<String> responsibilities;

}