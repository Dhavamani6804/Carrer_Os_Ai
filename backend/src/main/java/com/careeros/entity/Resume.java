package com.careeros.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "resumes")
public class Resume {

    @Id
    private String id;

    private String userId;

    private String fileName;

    private String fileType;

    private Long fileSize;

    private String filePath;

    private Instant uploadedAt;
}