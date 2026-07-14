package com.careeros.service;

import com.careeros.dto.request.ChangePasswordRequest;
import com.careeros.dto.request.UpdateSettingsRequest;
import com.careeros.dto.response.SettingsResponse;

public interface SettingsService {

    SettingsResponse getSettings();

    SettingsResponse updateSettings(
            UpdateSettingsRequest request
    );

    void changePassword(
            ChangePasswordRequest request
    );

}