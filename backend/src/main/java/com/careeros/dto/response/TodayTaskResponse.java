package com.careeros.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodayTaskResponse {

    private List<TaskResponse> tasks;

    private int totalTasks;

    private int completedTasks;

    private int progress;

}