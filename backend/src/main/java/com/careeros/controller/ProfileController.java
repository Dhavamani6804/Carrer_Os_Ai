package com.careeros.controller;

import com.careeros.dto.request.UpdateProfileRequest;
import com.careeros.dto.response.ProfileResponse;
import com.careeros.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ProfileResponse getProfile() {

        return profileService.getProfile();

    }

    @PutMapping
    public ProfileResponse updateProfile(
            @Valid @RequestBody UpdateProfileRequest request
    ) {

        return profileService.updateProfile(request);

    }

}