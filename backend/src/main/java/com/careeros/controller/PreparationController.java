
package com.careeros.controller;

import com.careeros.dto.request.PrepareJobRequest;
import com.careeros.dto.response.PreparationPlanResponse;
import com.careeros.service.AIPreparationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/preparation")
@RequiredArgsConstructor
public class PreparationController {

    private final AIPreparationService preparationService;

    @PostMapping("/start")
    public ResponseEntity<PreparationPlanResponse> startPreparation(
            @Valid @RequestBody PrepareJobRequest request
    ) {

        return ResponseEntity.ok(
                preparationService.startPreparation(request)
        );

    }

}