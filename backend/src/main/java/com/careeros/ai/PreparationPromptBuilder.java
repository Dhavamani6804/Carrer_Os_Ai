
package com.careeros.ai;

import com.careeros.entity.JobApplication;
import org.springframework.stereotype.Component;

@Component
public class PreparationPromptBuilder {

    public String buildPreparationPrompt(JobApplication application) {

        return """
You are CareerOS AI Mentor.

Your task is to create a complete interview preparation roadmap.

The roadmap should be personalized for this job.

Job Role:
%s

Company:
%s

Job Description:
%s

Skills:
%s

Requirements:
%s

Responsibilities:
%s

Return ONLY valid JSON.

Do not explain.

Do not use markdown.

Do not wrap inside ```json.

Schema:

{
  "overview":"",
  "technicalTopics":[],
  "codingTopics":[],
  "interviewQuestions":[],
  "behavioralQuestions":[],
  "projectSuggestions":[],
  "preparationRoadmap":[],
  "strengths":[],
  "weaknesses":[],
  "finalAdvice":""
}

""".formatted(

                application.getRole(),
                application.getCompany(),
                application.getJobDescription(),
                application.getSkills(),
                application.getRequirements(),
                application.getResponsibilities()

        );

    }

}