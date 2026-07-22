package com.careeros.service;

import com.careeros.dto.request.GenerateDocumentRequest;
import com.careeros.dto.response.GeneratedDocumentResponse;

public interface AIDocumentService {

    GeneratedDocumentResponse generateDocument(
            GenerateDocumentRequest request
    );

}
