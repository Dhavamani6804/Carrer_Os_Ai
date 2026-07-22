package com.careeros.dto.request;

import com.careeros.entity.enums.DocumentType;
import lombok.Data;

@Data
public class GenerateDocumentRequest {

    private String applicationId;

    private DocumentType type;

}