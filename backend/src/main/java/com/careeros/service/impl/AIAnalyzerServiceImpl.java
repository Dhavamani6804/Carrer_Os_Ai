package com.careeros.service.impl;

import com.careeros.ai.JobDescriptionAnalyzer;
import com.careeros.dto.request.AnalyzeJobDescriptionRequest;
import com.careeros.dto.response.JobDescriptionAnalysisResponse;
import com.careeros.service.AIAnalyzerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIAnalyzerServiceImpl
        implements AIAnalyzerService {

    private final JobDescriptionAnalyzer analyzer;

    @Override
    public JobDescriptionAnalysisResponse analyzeJobDescription(
            AnalyzeJobDescriptionRequest request
    ) {

        return analyzer.analyze(request);

    }

}