package com.careeros.service.impl;

import com.careeros.dto.request.UpdateProfileRequest;
import com.careeros.dto.response.ProfileResponse;
import com.careeros.entity.User;
import com.careeros.repository.UserRepository;
import com.careeros.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;

private User getCurrentUser() {

    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    return userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));
}

    @Override
    public ProfileResponse getProfile() {

        User user = getCurrentUser();

        return mapToProfileResponse(user);

    }

    @Override
    public ProfileResponse updateProfile(UpdateProfileRequest request) {

        User user = getCurrentUser();

        user.setHeadline(request.getHeadline());
        user.setAbout(request.getAbout());
        user.setPhone(request.getPhone());
        user.setLocation(request.getLocation());

        user.setCollege(request.getCollege());
        user.setDegree(request.getDegree());
        user.setGraduationYear(request.getGraduationYear());

        user.setGithub(request.getGithub());
        user.setLinkedin(request.getLinkedin());
        user.setPortfolio(request.getPortfolio());

        user.setSkills(request.getSkills());
        user.setProfileImage(request.getProfileImage());

        userRepository.save(user);

        return mapToProfileResponse(user);

    }

    private ProfileResponse mapToProfileResponse(User user) {

        return ProfileResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())

                .headline(user.getHeadline())
                .about(user.getAbout())
                .phone(user.getPhone())
                .location(user.getLocation())

                .college(user.getCollege())
                .degree(user.getDegree())
                .graduationYear(user.getGraduationYear())

                .github(user.getGithub())
                .linkedin(user.getLinkedin())
                .portfolio(user.getPortfolio())

                .skills(user.getSkills())
                .profileImage(user.getProfileImage())

                .build();
    }

}

