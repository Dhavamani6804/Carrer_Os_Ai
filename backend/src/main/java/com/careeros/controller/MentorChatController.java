package com.careeros.controller;

import com.careeros.dto.request.MentorChatRequest;
import com.careeros.dto.response.MentorChatResponse;
import com.careeros.dto.response.MentorMessageResponse;
import com.careeros.service.MentorChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/preparation")
@RequiredArgsConstructor
public class MentorChatController {

    private final MentorChatService mentorChatService;

    @PostMapping("/chat")
    public ResponseEntity<MentorChatResponse> chat(
            @Valid
            @RequestBody
            MentorChatRequest request
    ) {

        return ResponseEntity.ok(
                mentorChatService.chat(request)
        );

    }

    @GetMapping("/chat/{sessionId}")
    public ResponseEntity<List<MentorMessageResponse>> getMessages(
            @PathVariable String sessionId
    ) {

        return ResponseEntity.ok(
                mentorChatService.getMessages(sessionId)
        );

    }

}