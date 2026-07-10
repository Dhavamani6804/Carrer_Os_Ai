package com.careeros.storage;

import com.careeros.exception.BadRequestException;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path uploadPath = Paths.get("uploads");

    @PostConstruct
    public void init() {

        try {

            Files.createDirectories(uploadPath);

        } catch (IOException e) {

            throw new RuntimeException("Could not create upload directory", e);

        }

    }

    @Override
    public String storeFile(MultipartFile file) {

        System.out.println("Original Name: " + file.getOriginalFilename());
        System.out.println("Size: " + file.getSize());
        System.out.println("Empty: " + file.isEmpty());

        if (file.isEmpty()) {
            throw new BadRequestException("Please select a file.");
        }

        if (!"application/pdf".equals(file.getContentType())) {
            throw new BadRequestException("Only PDF files are allowed.");
        }

        String uniqueFileName =
                UUID.randomUUID() + "_" + file.getOriginalFilename();

        try {

            Files.copy(
                    file.getInputStream(),
                    uploadPath.resolve(uniqueFileName),
                    StandardCopyOption.REPLACE_EXISTING
            );

        } catch (IOException e) {
            throw new RuntimeException("Unable to store file.");
        }

        return uniqueFileName;
    }

    @Override
    public Resource loadFile(String fileName) {

        try {

            Path file = uploadPath.resolve(fileName);

            Resource resource = new UrlResource(file.toUri());

            if (resource.exists()) {
                return resource;
            }

            throw new RuntimeException("File not found.");

        } catch (MalformedURLException e) {

            throw new RuntimeException("Invalid file.");

        }

    }

    @Override
    public void deleteFile(String fileName) {

        try {

            Files.deleteIfExists(uploadPath.resolve(fileName));

        } catch (IOException e) {

            throw new RuntimeException("Unable to delete file.");

        }

    }

}