package com.careeros.service;

import com.careeros.dto.request.MentorChatRequest;
import com.careeros.dto.response.MentorChatResponse;
import com.careeros.dto.response.MentorMessageResponse;

import java.util.List;

public interface MentorChatService {

    MentorChatResponse chat(
            MentorChatRequest request
    );

    List<MentorMessageResponse> getMessages(
            String sessionId
    );

}