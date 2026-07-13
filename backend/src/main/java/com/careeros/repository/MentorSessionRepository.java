package com.careeros.repository;

import com.careeros.entity.MentorSession;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MentorSessionRepository
        extends MongoRepository<MentorSession, String> {

    Optional<MentorSession> findByApplicationId(
            String applicationId
    );

    boolean existsByApplicationId(
            String applicationId
    );

}