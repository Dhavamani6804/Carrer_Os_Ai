package com.careeros.service;

import com.careeros.dto.response.ResumeResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    ResumeResponse uploadResume(MultipartFile file);

    ResumeResponse getResume();

    Resource downloadResume();

    void deleteResume();

}