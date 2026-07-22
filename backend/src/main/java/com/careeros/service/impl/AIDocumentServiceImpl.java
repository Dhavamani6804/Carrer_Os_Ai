package com.careeros.service.impl;

import com.careeros.ai.CoverLetterPromptBuilder;
import com.careeros.ai.HREmailPromptBuilder;
import com.careeros.client.GeminiClient;
import com.careeros.dto.request.GenerateDocumentRequest;
import com.careeros.dto.response.GeneratedDocumentResponse;
import com.careeros.entity.JobApplication;
import com.careeros.entity.Resume;
import com.careeros.entity.enums.DocumentType;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.JobApplicationRepository;
import com.careeros.repository.ResumeRepository;
import com.careeros.security.CurrentUserService;
import com.careeros.service.AIDocumentService;
import com.careeros.service.ResumeTextExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIDocumentServiceImpl
        implements AIDocumentService {

    private final JobApplicationRepository jobRepository;

    private final ResumeRepository resumeRepository;

    private final CurrentUserService currentUserService;

    private final ResumeTextExtractor resumeTextExtractor;

    private final GeminiClient geminiClient;

    private final CoverLetterPromptBuilder coverLetterPromptBuilder;

    private final HREmailPromptBuilder hrEmailPromptBuilder;

    @Override
    public GeneratedDocumentResponse generateDocument(
            GenerateDocumentRequest request
    ) {

        String userId = currentUserService.getCurrentUserId();

        JobApplication application =
                jobRepository.findById(request.getApplicationId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Application not found."));

        if (!application.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Application not found.");
        }

        Resume resume =
                resumeRepository.findByUserId(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Resume not uploaded."));

        String resumeText =
                resumeTextExtractor.extractText(
                        resume.getFileName()
                );

        String prompt = switch (request.getType()) {

            case COVER_LETTER ->
                    coverLetterPromptBuilder.buildPrompt(
                            resumeText,
                            application.getRole(),
                            application.getCompany(),
                            application.getJobDescription()
                    );

            case HR_EMAIL ->
                    hrEmailPromptBuilder.buildPrompt(
                            resumeText,
                            application.getRole(),
                            application.getCompany(),
                            application.getJobDescription()
                    );
        };

        String result =
                geminiClient.generateContent(prompt);

        return GeneratedDocumentResponse.builder()
                .type(request.getType().name())
                .content(result)
                .build();

    }

}