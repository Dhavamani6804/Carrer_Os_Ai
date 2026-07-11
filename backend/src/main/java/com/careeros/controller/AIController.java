package com.careeros.controller;

import com.careeros.dto.request.AIRequest;
import com.careeros.dto.response.AIResponse;
import com.careeros.service.AIService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/ask")
    public ResponseEntity<AIResponse> askQuestion(
            @Valid @RequestBody AIRequest request
    ) {

        return ResponseEntity.ok(
                aiService.askQuestion(request)
        );

    }

}