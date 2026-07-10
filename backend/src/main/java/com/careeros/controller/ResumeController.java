package com.careeros.controller;

import com.careeros.dto.response.ResumeResponse;
import com.careeros.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ResumeResponse> uploadResume(
            @RequestParam("file") MultipartFile file) {

        return ResponseEntity.ok(
                resumeService.uploadResume(file)
        );
    }

    @GetMapping
    public ResponseEntity<ResumeResponse> getResume() {

        return ResponseEntity.ok(
                resumeService.getResume()
        );
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadResume() {

        Resource resource = resumeService.downloadResume();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"resume.pdf\""
                )
                .body(resource);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteResume() {

        resumeService.deleteResume();

        return ResponseEntity.ok("Resume deleted successfully.");

    }

}