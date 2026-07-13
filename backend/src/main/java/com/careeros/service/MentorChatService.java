
package com.careeros.service;

import com.careeros.dto.request.MentorChatRequest;
import com.careeros.dto.response.MentorChatResponse;

public interface MentorChatService {

    MentorChatResponse chat(
            MentorChatRequest request
    );

}