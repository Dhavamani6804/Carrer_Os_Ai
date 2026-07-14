package com.careeros.service.impl;

import com.careeros.dto.request.ChangePasswordRequest;
import com.careeros.dto.request.UpdateSettingsRequest;
import com.careeros.dto.response.SettingsResponse;
import com.careeros.entity.User;
import com.careeros.exception.BadRequestException;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.UserRepository;
import com.careeros.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

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

                .preferredRole(user.getPreferredRole())
                .preferredLocation(user.getPreferredLocation())
                .expectedSalary(user.getExpectedSalary())
                .workMode(user.getWorkMode())
                .employmentType(user.getEmploymentType())
                .preferredSkills(user.getPreferredSkills())
                .dailyStudyGoal(user.getDailyStudyGoal())

                .mentorLevel(user.getMentorLevel())
                .answerLength(user.getAnswerLength())
                .autoGeneratePreparation(user.getAutoGeneratePreparation())
                .personalizedRecommendations(user.getPersonalizedRecommendations())

                .emailNotifications(user.getEmailNotifications())
                .interviewReminders(user.getInterviewReminders())
                .applicationReminders(user.getApplicationReminders())
                .preparationReminders(user.getPreparationReminders())
                .weeklyReport(user.getWeeklyReport())

                .theme(user.getTheme())

                .profileVisible(user.getProfileVisible())

                .build();

    }

    @Override
    public SettingsResponse updateSettings(
            UpdateSettingsRequest request
    ) {

        User user = getCurrentUser();

        user.setPreferredRole(request.getPreferredRole());

        user.setPreferredLocation(request.getPreferredLocation());

        user.setExpectedSalary(request.getExpectedSalary());

        user.setWorkMode(request.getWorkMode());

        user.setEmploymentType(request.getEmploymentType());

        user.setPreferredSkills(request.getPreferredSkills());

        user.setDailyStudyGoal(request.getDailyStudyGoal());

        user.setMentorLevel(request.getMentorLevel());

        user.setAnswerLength(request.getAnswerLength());

        user.setAutoGeneratePreparation(
                request.getAutoGeneratePreparation());

        user.setPersonalizedRecommendations(
                request.getPersonalizedRecommendations());

        user.setEmailNotifications(
                request.getEmailNotifications());

        user.setInterviewReminders(
                request.getInterviewReminders());

        user.setApplicationReminders(
                request.getApplicationReminders());

        user.setPreparationReminders(
                request.getPreparationReminders());

        user.setWeeklyReport(
                request.getWeeklyReport());

        user.setTheme(request.getTheme());

        user.setProfileVisible(
                request.getProfileVisible());

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
}