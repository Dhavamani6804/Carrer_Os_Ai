
package com.careeros.controller;

import com.careeros.dto.request.MentorChatRequest;
import com.careeros.dto.response.MentorChatResponse;
import com.careeros.service.MentorChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}