package com.careeros.service.impl;

import com.careeros.entity.MentorSession;
import com.careeros.repository.JobApplicationRepository;
import com.careeros.repository.MentorProgressRepository;
import com.careeros.repository.MentorSessionRepository;
import com.careeros.repository.ResumeRepository;
import com.careeros.repository.UserRepository;
import com.careeros.security.CurrentUserService;
import com.careeros.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final CurrentUserService currentUserService;

    private final UserRepository userRepository;

    private final ResumeRepository resumeRepository;

    private final JobApplicationRepository jobApplicationRepository;

    private final MentorSessionRepository mentorSessionRepository;

    private final MentorProgressRepository mentorProgressRepository;

    @Override
    public void resetPreparationProgress() {

        String userId = currentUserService.getCurrentUserId();

        System.out.println("Current User = " + userId);

        List<MentorSession> sessions =
                mentorSessionRepository.findAllByUserId(userId);

        System.out.println("Sessions Found = " + sessions.size());

        List<String> sessionIds =
                sessions.stream()
                        .map(MentorSession::getId)
                        .toList();

        System.out.println("Session IDs = " + sessionIds);

        if (!sessionIds.isEmpty()) {

            mentorProgressRepository.deleteAllBySessionIdIn(sessionIds);

            System.out.println("Progress deleted");

        }

        sessions.forEach(session ->
                session.setCompletionPercentage(0));

        mentorSessionRepository.saveAll(sessions);

    }

    @Override
    public void deleteCareerHub() {

        String userId = currentUserService.getCurrentUserId();

        System.out.println("User = " + userId);

        List<MentorSession> sessions =
                mentorSessionRepository.findAllByUserId(userId);

        System.out.println("Sessions = " + sessions.size());

        System.out.println(
                "Applications = " +
                        jobApplicationRepository.findByUserId(userId).size()
        );

        mentorSessionRepository.deleteAllByUserId(userId);

        jobApplicationRepository.deleteAllByUserId(userId);

    }

    @Override
    public void deleteAccount() {

        String userId = currentUserService.getCurrentUserId();

        deleteCareerHub();

        resumeRepository.deleteByUserId(userId);

        userRepository.deleteById(userId);

    }

}