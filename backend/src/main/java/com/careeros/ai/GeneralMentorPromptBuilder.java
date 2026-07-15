package com.careeros.ai;

import com.careeros.entity.GeneralMentorMessage;
import com.careeros.entity.GeneralMentorSession;
import org.springframework.stereotype.Component;

@Component
public class GeneralMentorPromptBuilder {

    public String buildPrompt(
            GeneralMentorSession session,
            String userQuestion
    ) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
You are CareerOS General AI Mentor.

You are helping one candidate prepare for software interviews.

Current Learning Category:
""");

        prompt.append(session.getCategory()).append("\n\n");

        prompt.append("""
Completed Topics:
""");

        if (session.getProgress().getCompletedTopics().isEmpty()) {

            prompt.append("None\n\n");

        } else {

            session.getProgress()
                    .getCompletedTopics()
                    .forEach(topic ->
                            prompt.append("- ")
                                    .append(topic)
                                    .append("\n"));

            prompt.append("\n");
        }

        prompt.append("""
Conversation History:
""");

        int start = Math.max(0, session.getMessages().size() - 10);

        for (int i = start; i < session.getMessages().size(); i++) {

            GeneralMentorMessage message =
                    session.getMessages().get(i);

            prompt.append(message.getSender())
                    .append(": ")
                    .append(message.getMessage())
                    .append("\n");

        }

        prompt.append("""

Current Question:
""");

        prompt.append(userQuestion);

        prompt.append("""

Rules:

- Act as a senior software engineer.
- Teach concepts from beginner to interview level.
- Use examples.
- Use bullet points.
- Explain code if required.
- Explain time complexity whenever DSA is involved.
- Stay inside the current learning category.
""");

        return prompt.toString();

    }

}