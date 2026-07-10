package com.careeros.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class ResumeResponse {

    private String id;

    private String fileName;

    private String fileType;

    private Long fileSize;

    private Instant uploadedAt;

}