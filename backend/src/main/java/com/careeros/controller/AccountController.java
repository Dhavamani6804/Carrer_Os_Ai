package com.careeros.controller;

import com.careeros.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @DeleteMapping("/progress")
    public ResponseEntity<Void> resetProgress() {

        accountService.resetPreparationProgress();

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/career-hub")
    public ResponseEntity<Void> deleteCareerHub() {

        accountService.deleteCareerHub();

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAccount() {

        accountService.deleteAccount();

        return ResponseEntity.noContent().build();
    }

}