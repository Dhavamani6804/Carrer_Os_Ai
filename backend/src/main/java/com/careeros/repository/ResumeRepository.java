package com.careeros.repository;

import com.careeros.entity.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ResumeRepository extends MongoRepository<Resume, String> {

    void deleteByUserId(String userId);
    Optional<Resume> findByUserId(String userId);

}