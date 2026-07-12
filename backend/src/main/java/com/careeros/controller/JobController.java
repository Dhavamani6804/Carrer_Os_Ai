package com.careeros.controller;

import com.careeros.dto.response.JobDetailsResponse;
import com.careeros.dto.response.JobResponse;
import com.careeros.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<List<JobResponse>> getJobs(

            @RequestParam(required = false) String keyword,

            @RequestParam(required = false) String location,

            @RequestParam(required = false) String employmentType,

            @RequestParam(required = false) String experienceLevel

    ) {

        return ResponseEntity.ok(

                jobService.filterJobs(
                        keyword,
                        location,
                        employmentType,
                        experienceLevel
                )

        );

    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobDetailsResponse> getJobById(
            @PathVariable String jobId
    ) {

        return ResponseEntity.ok(
                jobService.getJobById(jobId)
        );

    }

}