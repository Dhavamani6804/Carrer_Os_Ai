package com.careeros.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateTaskRequest {

    @NotBlank(message = "Task title is required.")
    @Size(max = 150, message = "Task title cannot exceed 150 characters.")
    private String title;

}