package com.careeros.service.impl;

import com.careeros.service.ResumeTextExtractor;
import com.careeros.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class ResumeTextExtractorImpl implements ResumeTextExtractor {

    private final FileStorageService fileStorageService;

    @Override
    public String extractText(String fileName) {

        Path path = fileStorageService.getFilePath(fileName);

        try (PDDocument document = Loader.loadPDF(path.toFile())) {

            PDFTextStripper stripper = new PDFTextStripper();

            return stripper.getText(document);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Unable to extract resume text.",
                    e
            );

        }

    }

}