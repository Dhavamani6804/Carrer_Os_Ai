package com.careeros.ai;

import org.springframework.stereotype.Component;

@Component
public class ResumeTailorPromptBuilder {

    public String buildPrompt(
            String resume,
            String role,
            String company,
            String jobDescription
    ) {

        return """
You are an expert ATS Resume Writer.

Your task is to optimize the resume ONLY.

DO NOT invent experience.

DO NOT invent projects.

DO NOT invent skills.

Improve wording.

Reorder bullet points.

Increase ATS score.

Prioritize keywords from the job description.

Do not remove important achievements.

Return ONLY the optimized resume.

No markdown.

========================
TARGET ROLE
========================

%s

========================
COMPANY
========================

%s

========================
JOB DESCRIPTION
========================

%s

========================
CURRENT RESUME
========================

%s
"""
                .formatted(
                        role,
                        company,
                        jobDescription,
                        resume
                );

    }

}