package com.careeros.service;

import com.careeros.dto.request.PrepareJobRequest;
import com.careeros.dto.response.PreparationPlanResponse;

public interface AIPreparationService {

    PreparationPlanResponse startPreparation(
            PrepareJobRequest request
    );

}
