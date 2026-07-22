package com.careeros.controller;

import com.careeros.dto.request.GenerateDocumentRequest;
import com.careeros.dto.response.GeneratedDocumentResponse;
import com.careeros.service.AIDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai/document")
@RequiredArgsConstructor
public class AIDocumentController {

    private final AIDocumentService aiDocumentService;

    @PostMapping
    public ResponseEntity<GeneratedDocumentResponse> generateDocument(
            @RequestBody GenerateDocumentRequest request
    ) {

        return ResponseEntity.ok(
                aiDocumentService.generateDocument(request)
        );

    }

}
