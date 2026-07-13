package com.careeros.controller;

import com.careeros.dto.request.AnalyzeJobDescriptionRequest;
import com.careeros.dto.request.CreateJobApplicationRequest;
import com.careeros.dto.request.UpdateApplicationStatusRequest;
import com.careeros.dto.response.CareerHubStatsResponse;
import com.careeros.dto.response.JobApplicationDetailsResponse;
import com.careeros.dto.response.JobApplicationResponse;
import com.careeros.dto.response.JobDescriptionAnalysisResponse;
import com.careeros.service.AIAnalyzerService;
import com.careeros.service.CareerHubService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/career-hub")
@RequiredArgsConstructor
public class CareerHubController {

    private final CareerHubService careerHubService;
    private final AIAnalyzerService aiAnalyzerService;

    @PostMapping("/analyze")
    public ResponseEntity<JobDescriptionAnalysisResponse> analyzeJobDescription(
            @Valid @RequestBody AnalyzeJobDescriptionRequest request
    ) {

        return ResponseEntity.ok(
                aiAnalyzerService.analyzeJobDescription(request)
        );

    }

    @PostMapping
    public ResponseEntity<JobApplicationDetailsResponse> createApplication(
            @Valid @RequestBody CreateJobApplicationRequest request
    ) {

        return ResponseEntity.ok(
                careerHubService.createApplication(request)
        );

    }

    @GetMapping
    public ResponseEntity<List<JobApplicationResponse>> getApplications() {

        return ResponseEntity.ok(
                careerHubService.getApplications()
        );

    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<JobApplicationDetailsResponse> getApplication(
            @PathVariable String applicationId
    ) {

        return ResponseEntity.ok(
                careerHubService.getApplicationById(applicationId)
        );

    }

    @PatchMapping("/{applicationId}/status")
    public ResponseEntity<JobApplicationDetailsResponse> updateStatus(
            @PathVariable String applicationId,
            @Valid @RequestBody UpdateApplicationStatusRequest request
    ) {

        return ResponseEntity.ok(
                careerHubService.updateStatus(applicationId, request)
        );

    }

    @DeleteMapping("/{applicationId}")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable String applicationId
    ) {

        careerHubService.deleteApplication(applicationId);

        return ResponseEntity.noContent().build();

    }
    @GetMapping("/stats")
    public ResponseEntity<CareerHubStatsResponse> getStats() {

        return ResponseEntity.ok(
                careerHubService.getStats()
        );

    }

}
