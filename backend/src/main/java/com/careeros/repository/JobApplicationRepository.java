package com.careeros.repository;

import com.careeros.entity.JobApplication;
import com.careeros.entity.enums.ApplicationStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface JobApplicationRepository extends MongoRepository<JobApplication, String> {

    List<JobApplication> findByUserId(String userId);

    List<JobApplication> findByUserIdAndStatus(
            String userId,
            ApplicationStatus status
    );

    long countByUserIdAndStatus(
            String userId,
            ApplicationStatus status
    );

    long countByUserIdAndStatusIn(
            String userId,
            List<ApplicationStatus> statuses
    );
}