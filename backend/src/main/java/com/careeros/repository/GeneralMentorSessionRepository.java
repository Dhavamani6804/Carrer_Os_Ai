package com.careeros.repository;

import com.careeros.entity.GeneralMentorSession;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface GeneralMentorSessionRepository
        extends MongoRepository<GeneralMentorSession, String> {

    Optional<GeneralMentorSession> findByUserIdAndCategory(
            String userId,
            String category
    );

    List<GeneralMentorSession> findByUserId(String userId);

    void deleteAllByUserId(String userId);

}