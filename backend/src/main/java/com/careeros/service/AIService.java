package com.careeros.service;

import com.careeros.dto.request.AIRequest;
import com.careeros.dto.response.AIResponse;

public interface AIService {

    AIResponse askQuestion(AIRequest request);

}