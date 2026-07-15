package com.careeros.service.impl;

import com.careeros.ai.ResumeTailorPromptBuilder;
import com.careeros.client.GeminiClient;
import com.careeros.dto.response.ResumeTailorResponse;
import com.careeros.entity.JobApplication;
import com.careeros.entity.Resume;
import com.careeros.entity.User;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.JobApplicationRepository;
import com.careeros.repository.ResumeRepository;
import com.careeros.repository.UserRepository;
import com.careeros.service.ResumeTailorService;
import com.careeros.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class ResumeTailorServiceImpl implements ResumeTailorService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final FileStorageService fileStorageService;
    private final ResumeTailorPromptBuilder promptBuilder;
    private final GeminiClient geminiClient;

    @Override
    public ResumeTailorResponse tailorResume(String applicationId) {

        User user = getCurrentUser();

        Resume resume =
                resumeRepository.findByUserId(user.getId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Resume not found."));

        JobApplication application =
                jobApplicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Application not found."));

        String resumeText = extractResumeText(resume.getFileName());

        String prompt =
                promptBuilder.buildPrompt(
                        resumeText,
                        application.getRole(),
                        application.getCompany(),
                        application.getJobDescription()
                );

        String tailoredResume =
                geminiClient.generateAnswer(prompt);

        return ResumeTailorResponse.builder()
                .tailoredResume(tailoredResume)
                .build();

    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));

    }

    private String extractResumeText(String fileName) {

        try {

            Path path =
                    fileStorageService.getFilePath(fileName);

            PDDocument document =
                    Loader.loadPDF(path.toFile());

            PDFTextStripper stripper =
                    new PDFTextStripper();

            String text =
                    stripper.getText(document);

            document.close();

            return text;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Unable to read resume.",
                    e
            );

        }

    }

}