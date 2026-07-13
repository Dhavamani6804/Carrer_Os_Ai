
package com.careeros.ai;

import com.careeros.entity.MentorMessage;
import com.careeros.entity.MentorSession;
import org.springframework.stereotype.Component;

@Component
public class MentorPromptBuilder {

    public String buildPrompt(
            MentorSession session,
            String userMessage
    ) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
You are CareerOS AI Interview Mentor.

Answer ONLY according to this interview preparation.

Role:
""");

        prompt.append(session.getRole()).append("\n");

        prompt.append("Company:\n");

        prompt.append(session.getCompany()).append("\n\n");

        prompt.append("Preparation Overview:\n");

        prompt.append(session.getOverview()).append("\n\n");

        prompt.append("""
Previous Conversation:
""");
        for (MentorMessage message : session.getMessages()) {

            prompt.append(message.getSender())
                    .append(": ")
                    .append(message.getMessage())
                    .append("\n");

        }

        prompt.append("""

Current User Question:

""");

        prompt.append(userMessage);

        prompt.append("""

Rules:

- Act like an interview mentor.
- Give practical answers.
- Explain concepts.
- Use bullet points.
- Never answer unrelated questions.
""");

        return prompt.toString();

    }

}