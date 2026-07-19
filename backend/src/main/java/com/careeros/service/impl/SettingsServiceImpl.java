package com.careeros.service.impl;

import com.careeros.dto.request.ChangePasswordRequest;
import com.careeros.dto.request.UpdateSettingsRequest;
import com.careeros.dto.response.SettingsResponse;
import com.careeros.entity.MentorSession;
import com.careeros.entity.User;
import com.careeros.exception.BadRequestException;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.*;
import com.careeros.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final ResumeRepository resumeRepository;

    private final JobApplicationRepository jobApplicationRepository;

    private final MentorSessionRepository mentorSessionRepository;

    private final MentorProgressRepository mentorProgressRepository;

    private final GeneralMentorSessionRepository generalMentorSessionRepository;

    private User getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));
    }

    @Override
    public SettingsResponse getSettings() {

        User user = getCurrentUser();

        return SettingsResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .theme(user.getTheme())
                .build();
    }

    @Override
    public SettingsResponse updateSettings(
            UpdateSettingsRequest request
    ) {

        User user = getCurrentUser();

        user.setFirstName(request.getFirstName());

        user.setLastName(request.getLastName());

        user.setTheme(request.getTheme());

        userRepository.save(user);

        return getSettings();
    }

    @Override
    public void changePassword(
            ChangePasswordRequest request
    ) {

        User user = getCurrentUser();

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new BadRequestException(
                    "Current password is incorrect.");
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()));

        userRepository.save(user);

    }

    @Override
    public void deleteAccount(String password) {

        User user = getCurrentUser();

        if (!passwordEncoder.matches(password, user.getPassword())) {

            throw new BadRequestException(
                    "Incorrect password."
            );

        }

        /*
         * Delete Resume
         */
        resumeRepository.findByUserId(user.getId())
                .ifPresent(resumeRepository::delete);

        /*
         * Delete Career Hub
         */
        jobApplicationRepository.deleteAllByUserId(user.getId());

        /*
         * Delete AI Preparation
         */
        List<MentorSession> sessions =
                mentorSessionRepository.findAllByUserId(user.getId());

        List<String> sessionIds = sessions.stream()
                .map(MentorSession::getId)
                .toList();

        if (!sessionIds.isEmpty()) {
            mentorProgressRepository.deleteAllBySessionIdIn(sessionIds);
        }

        mentorSessionRepository.deleteAllByUserId(user.getId());

        /*
         * Delete General Mentor
         */
        generalMentorSessionRepository.deleteAllByUserId(user.getId());

        /*
         * Finally delete user
         */
        userRepository.delete(user);

    }
}