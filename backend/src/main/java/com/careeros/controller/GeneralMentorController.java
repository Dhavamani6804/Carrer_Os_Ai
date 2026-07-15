package com.careeros.controller;

import com.careeros.entity.GeneralMentorSession;
import com.careeros.service.GeneralMentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/general-mentor")
@RequiredArgsConstructor
public class GeneralMentorController {

    private final GeneralMentorService service;

    @PostMapping("/session/{category}")
    public ResponseEntity<GeneralMentorSession> startSession(
            @PathVariable String category
    ) {

        return ResponseEntity.ok(
                service.startSession(category)
        );

    }

    @PostMapping("/chat/{sessionId}")
    public ResponseEntity<Map<String, String>> chat(

            @PathVariable String sessionId,

            @RequestBody Map<String, String> body

    ) {

        String answer = service.chat(
                sessionId,
                body.get("message")
        );

        return ResponseEntity.ok(
                Map.of("answer", answer)
        );

    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<GeneralMentorSession> getSession(
            @PathVariable String sessionId
    ) {

        return ResponseEntity.ok(
                service.getSession(sessionId)
        );

    }

}