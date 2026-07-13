package com.careeros.service;

import com.careeros.dto.request.UpdateProgressRequest;
import com.careeros.dto.response.ProgressResponse;

public interface ProgressService {

    ProgressResponse updateProgress(
            UpdateProgressRequest request
    );

    ProgressResponse getProgress(
            String sessionId
    );

}