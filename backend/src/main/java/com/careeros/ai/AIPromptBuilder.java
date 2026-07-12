package com.careeros.ai;

import org.springframework.stereotype.Component;

@Component
public class AIPromptBuilder {

    public String buildJobDescriptionPrompt(
            String role,
            String jobDescription
    ) {

        return """
You are an expert Technical Recruiter and Career Coach.

Analyze the following job description and extract all possible information.

Job Role:
%s

Job Description:
%s

Instructions:

- Return ONLY valid JSON.
- Do not explain anything.
- Do not use markdown.
- Do not wrap the response inside ```json.
- Never return empty strings.
- If a value cannot be determined, return null.
- Extract as much information as possible from the job description.
- Infer values only when highly confident.

Enum values:

workMode:
REMOTE
HYBRID
ONSITE

employmentType:
FULL_TIME
PART_TIME
INTERNSHIP
CONTRACT

experienceLevel:
FRESHER
ONE_TO_THREE_YEARS
THREE_TO_FIVE_YEARS
FIVE_PLUS_YEARS

Return a JSON object using the following schema:

{
  "company": null,
  "companyLogo": null,
  "salary": null,
  "location": null,
  "workMode": null,
  "employmentType": null,
  "experienceLevel": null,
  "skills": [],
  "requirements": [],
  "responsibilities": []
}
"""
                .formatted(role, jobDescription);

    }

}