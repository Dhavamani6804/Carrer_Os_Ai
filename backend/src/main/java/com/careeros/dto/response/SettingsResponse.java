package com.careeros.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SettingsResponse {

    private String firstName;

    private String lastName;

    private String email;

    private String theme;

}