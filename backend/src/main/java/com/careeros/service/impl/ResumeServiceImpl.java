package com.careeros.service.impl;

import com.careeros.dto.response.ResumeResponse;
import com.careeros.entity.Resume;
import com.careeros.entity.User;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.ResumeRepository;
import com.careeros.repository.UserRepository;
import com.careeros.service.ResumeService;
import com.careeros.storage.FileStorageService;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.time.Instant;


@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    @Override
    public ResumeResponse uploadResume(MultipartFile file) {

        User user = getCurrentUser();

        resumeRepository.findByUserId(user.getId())
                .ifPresent(existingResume -> {

                    fileStorageService.deleteFile(existingResume.getFileName());

                    resumeRepository.delete(existingResume);

                });

        String storedFileName = fileStorageService.storeFile(file);

        Resume resume = Resume.builder()
                .userId(user.getId())
                .fileName(storedFileName)
                .fileType(file.getContentType())
                .fileSize(file.getSize())
                .uploadedAt(Instant.now())
                .build();

        Resume savedResume = resumeRepository.save(resume);

        return ResumeResponse.builder()
                .id(savedResume.getId())
                .fileName(savedResume.getFileName())
                .fileType(savedResume.getFileType())
                .fileSize(savedResume.getFileSize())
                .uploadedAt(savedResume.getUploadedAt())
                .build();
    }

    @Override
    public ResumeResponse getResume() {

        User user = getCurrentUser();

        Resume resume = resumeRepository.findByUserId(user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));

        return ResumeResponse.builder()
                .id(resume.getId())
                .fileName(resume.getFileName())
                .fileType(resume.getFileType())
                .fileSize(resume.getFileSize())
                .uploadedAt(resume.getUploadedAt())
                .build();
    }

    @Override
    public Resource downloadResume() {

        User user = getCurrentUser();

        Resume resume = resumeRepository.findByUserId(user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));

        return fileStorageService.loadFile(resume.getFileName());

    }

    @Override
    public void deleteResume() {

        User user = getCurrentUser();

        Resume resume = resumeRepository.findByUserId(user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));

        fileStorageService.deleteFile(resume.getFileName());

        resumeRepository.delete(resume);

    }


}