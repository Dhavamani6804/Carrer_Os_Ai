package com.careeros.service;

import com.careeros.dto.request.AnalyzeJobDescriptionRequest;
import com.careeros.dto.response.JobDescriptionAnalysisResponse;

public interface AIAnalyzerService {

    JobDescriptionAnalysisResponse analyzeJobDescription(
            AnalyzeJobDescriptionRequest request
    );

}