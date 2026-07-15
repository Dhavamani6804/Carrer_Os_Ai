package com.careeros.ai;

import com.careeros.entity.MentorMessage;
import com.careeros.entity.MentorSession;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MentorPromptBuilder {

    public String buildPrompt(
            MentorSession session,
            String progressContext,
            String userMessage
    ) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
You are CareerOS AI Mentor.

You are NOT a generic chatbot.

You are mentoring one candidate for ONE specific interview.

Always answer according to the preparation plan.

==========================
INTERVIEW CONTEXT
==========================

""");

        prompt.append(session.getPreparationContext()).append("\n\n");

        prompt.append("""
==========================
CURRENT PREPARATION PROGRESS
==========================

""");

        prompt.append(progressContext).append("\n\n");

        prompt.append("""
==========================
ROLE
==========================
""");

        prompt.append(session.getRole()).append("\n\n");

        prompt.append("""
==========================
COMPANY
==========================
""");

        prompt.append(session.getCompany()).append("\n\n");

        prompt.append("""
==========================
PREPARATION OVERVIEW
==========================
""");

        prompt.append(session.getOverview()).append("\n\n");

        prompt.append("""
==========================
TECHNICAL TOPICS
==========================
""");

        appendList(prompt, session.getTechnicalTopics());

        prompt.append("""
==========================
CODING TOPICS
==========================
""");

        appendList(prompt, session.getCodingTopics());

        prompt.append("""
==========================
ROADMAP
==========================
""");

        appendList(prompt, session.getPreparationRoadmap());

        prompt.append("""
==========================
STRENGTHS
==========================
""");

        appendList(prompt, session.getStrengths());

        prompt.append("""
==========================
WEAKNESSES
==========================
""");

        appendList(prompt, session.getWeaknesses());

        prompt.append("""
==========================
FINAL ADVICE
==========================
""");

        prompt.append(session.getFinalAdvice()).append("\n\n");

        prompt.append("""
==========================
RECENT CHAT HISTORY
==========================
""");

        List<MentorMessage> messages = session.getMessages();

        int start = Math.max(0, messages.size() - 12);

        for (int i = start; i < messages.size(); i++) {

            MentorMessage message = messages.get(i);

            prompt.append(message.getSender())
                    .append(": ")
                    .append(message.getMessage())
                    .append("\n");

        }

        prompt.append("""

==========================
CURRENT QUESTION
==========================

""");

        prompt.append(userMessage);

        prompt.append("""

==========================
RULES
==========================

1. Stay focused on this interview.

2. Personalize every answer for this role.

3. If possible, relate the answer to this company.

4. Give practical interview advice.

5. Use bullet points.

6. Use examples whenever useful.

7. If explaining code,
provide clean interview-quality code.

8. If asked DSA,
explain intuition,
time complexity,
space complexity,
and edge cases.

9. Keep answers concise but complete.

10. Never answer unrelated questions.
""");

        return prompt.toString();

    }

    private void appendList(
            StringBuilder prompt,
            List<String> list
    ) {

        if (list == null || list.isEmpty()) {

            prompt.append("None\n\n");

            return;

        }

        for (String item : list) {

            prompt.append("- ")
                    .append(item)
                    .append("\n");

        }

        prompt.append("\n");

    }

}