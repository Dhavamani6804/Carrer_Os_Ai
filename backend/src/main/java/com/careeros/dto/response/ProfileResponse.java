package com.careeros.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProfileResponse {

    private String firstName;

    private String lastName;

    private String email;

    private String headline;

    private String about;

    private String phone;

    private String location;

    private String college;

    private String degree;

    private Integer graduationYear;

    private String github;

    private String linkedin;

    private String portfolio;

    private List<String> skills;

    private String profileImage;
}