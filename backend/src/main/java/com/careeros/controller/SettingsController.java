package com.careeros.controller;

import com.careeros.dto.request.ChangePasswordRequest;
import com.careeros.dto.request.UpdateSettingsRequest;
import com.careeros.dto.response.SettingsResponse;
import com.careeros.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsService settingsService;

    @GetMapping
    public ResponseEntity<SettingsResponse> getSettings() {

        return ResponseEntity.ok(
                settingsService.getSettings()
        );

    }

    @PatchMapping
    public ResponseEntity<SettingsResponse> updateSettings(
            @RequestBody UpdateSettingsRequest request
    ) {

        return ResponseEntity.ok(
                settingsService.updateSettings(request)
        );

    }

    @PatchMapping("/password")
    public ResponseEntity<Void> changePassword(
            @RequestBody ChangePasswordRequest request
    ) {

        settingsService.changePassword(request);

        return ResponseEntity.ok().build();

    }

}