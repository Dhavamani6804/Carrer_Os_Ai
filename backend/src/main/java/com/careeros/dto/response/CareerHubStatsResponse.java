package com.careeros.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareerHubStatsResponse {

    private long wishlist;

    private long applied;

    private long interviewing;

    private long offers;

    private long joined;

    private long rejected;

}