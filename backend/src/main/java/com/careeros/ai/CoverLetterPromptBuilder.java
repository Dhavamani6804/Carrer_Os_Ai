package com.careeros.ai;

import org.springframework.stereotype.Component;

@Component
public class CoverLetterPromptBuilder {

    public String buildPrompt(
            String resume,
            String role,
            String company,
            String jobDescription
    ) {

        return """
You are an expert technical recruiter and professional career coach.

Generate a highly personalized cover letter.

Rules:

- Tailor it specifically to the company and role.
- Use only information from the resume.
- Never invent experience, projects, certifications or skills.
- Highlight the resume experiences that best match the job description.
- Keep it professional.
- Keep it within one page.
- Use proper business letter formatting.
- Return plain text only.
- Do not use markdown.

========================
COMPANY
========================

%s

========================
ROLE
========================

%s

========================
JOB DESCRIPTION
========================

%s

========================
RESUME
========================

%s
"""
                .formatted(
                        company,
                        role,
                        jobDescription,
                        resume
                );

    }

}
