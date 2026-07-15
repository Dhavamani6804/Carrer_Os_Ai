package com.careeros.service;

import com.careeros.entity.GeneralMentorSession;

public interface GeneralMentorService {

    GeneralMentorSession startSession(
            String category
    );

    String chat(
            String sessionId,
            String message
    );

    GeneralMentorSession getSession(
            String sessionId
    );

}