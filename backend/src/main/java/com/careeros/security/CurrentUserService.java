package com.careeros.security;

import com.careeros.entity.User;
import com.careeros.exception.ResourceNotFoundException;
import com.careeros.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Returns the currently logged-in user.
     */
    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found."
                        )
                );
    }

    /**
     * Returns current user's id.
     */
    public String getCurrentUserId() {
        return getCurrentUser().getId();
    }

}