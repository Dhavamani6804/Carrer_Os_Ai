package com.careeros.service;

import com.careeros.dto.request.UpdateProfileRequest;
import com.careeros.dto.response.ProfileResponse;

public interface ProfileService {

    ProfileResponse getProfile();

    ProfileResponse updateProfile(UpdateProfileRequest request);

}