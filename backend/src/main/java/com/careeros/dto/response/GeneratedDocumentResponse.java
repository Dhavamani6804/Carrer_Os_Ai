package com.careeros.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GeneratedDocumentResponse {

    private String type;

    private String content;

}