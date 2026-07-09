package com.careeros.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class UpdateProfileRequest {

    @Size(max = 100)
    private String headline;

    @Size(max = 1000)
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