
package com.careeros.repository;

import com.careeros.entity.MentorProgress;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MentorProgressRepository
        extends MongoRepository<MentorProgress, String> {

    void deleteAllBySessionIdIn(List<String> sessionIds);

    Optional<MentorProgress> findBySessionId(
            String sessionId
    );

}