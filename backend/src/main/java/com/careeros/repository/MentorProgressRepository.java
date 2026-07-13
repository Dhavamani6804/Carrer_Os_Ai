
package com.careeros.repository;

import com.careeros.entity.MentorProgress;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MentorProgressRepository
        extends MongoRepository<MentorProgress, String> {

    Optional<MentorProgress> findBySessionId(
            String sessionId
    );

}