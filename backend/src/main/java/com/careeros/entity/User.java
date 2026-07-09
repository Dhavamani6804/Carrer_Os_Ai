package com.careeros.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
import java.util.List;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;

    // Authentication
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    // Profile
    private String headline;
    private String about;
    private String phone;
    private String location;

    // Education
    private String college;
    private String degree;
    private Integer graduationYear;

    // Social Links
    private String github;
    private String linkedin;
    private String portfolio;

    // Skills
    private List<String> skills;

    // Profile Image
    private String profileImage;

    // Timestamps
    private Instant createdAt;
    private Instant updatedAt;
}