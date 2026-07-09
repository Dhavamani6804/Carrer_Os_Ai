package com.careeros.service.impl;

import com.careeros.dto.response.DashboardResponse;
import com.careeros.entity.User;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.UserRepository;
import com.careeros.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;

    @Override
    public DashboardResponse getDashboard() {

        User user = getCurrentUser();

        int skillsCount = user.getSkills() == null
                ? 0
                : user.getSkills().size();

        return DashboardResponse.builder()
                .name(user.getFirstName())
                .resumeScore(0)
                .applications(0)
                .interviews(0)
                .skills(skillsCount)
                .build();
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }
}