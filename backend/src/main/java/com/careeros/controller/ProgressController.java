package com.careeros.controller;

import com.careeros.dto.request.UpdateProgressRequest;
import com.careeros.dto.response.ProgressResponse;
import com.careeros.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @PatchMapping
    public ResponseEntity<ProgressResponse> updateProgress(
            @RequestBody UpdateProgressRequest request
    ) {
        return ResponseEntity.ok(
                progressService.updateProgress(request)
        );
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<ProgressResponse> getProgress(
            @PathVariable String sessionId
    ) {
        return ResponseEntity.ok(
                progressService.getProgress(sessionId)
        );
    }

}