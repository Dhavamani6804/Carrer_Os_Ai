package com.careeros.dto.request;

import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateSettingsRequest {

    private String firstName;

    private String lastName;

    private String theme;

}