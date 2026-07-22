package com.careeros.ai;

import org.springframework.stereotype.Component;

@Component
public class HREmailPromptBuilder {

    public String buildPrompt(
            String resume,
            String role,
            String company,
            String jobDescription
    ) {

        return """
You are an experienced software engineering recruiter.

Write a professional job application email.

Rules:

- Keep it under 180 words.
- Mention the position.
- Mention the company.
- Mention that the resume is attached.
- Use ONLY information available in the resume.
- Do not invent achievements.
- Keep it concise and professional.
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
